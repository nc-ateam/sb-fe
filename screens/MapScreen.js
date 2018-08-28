import React, { Component } from 'react';
import { View, NavigationBar, Icon, Title, Button } from '@shoutem/ui';
import { Dimensions, AppRegistry, StatusBar, Platform } from 'react-native';
import { MapView } from 'expo';
import * as api from '../api/api';
import Achievements from '../components/Achievements';

const { width, height } = Dimensions.get('window');
const halfHeight = height / 3;
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class MapScreen extends Component {
  state = {
    region: {},
    currentLocation: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    landmarks: [],
    isLoading: true,
    screenHeight: 0,
    landmarkId: '',
    landmarkName: ''
  };

  render() {
    const {
      landmarks,
      region,
      isLoading,
      currentLocation,
      screenHeight,
      landmarkId,
      landmarkName
    } = this.state;
    const { screenProps, navigation } = this.props;
    const { userId } = screenProps;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ height: STATUSBAR_HEIGHT, backgroundColor: 'lightgrey' }}
        >
          <StatusBar />
        </View>
        {!isLoading && (
          <MapView
            followsUserLocation={true}
            onMapReady={() => {
              this.map.fitToCoordinates(
                [
                  {
                    latitude: this.state.currentLocation.latitude,
                    longitude: this.state.currentLocation.longitude
                  }
                ],
                {
                  edgePadding: { top: 150, right: 5, bottom: 5, left: 10 },
                  animated: true
                }
              );
            }}
            ref={(ref) => {
              this.map = ref;
            }}
            style={{ height: screenHeight }}
            region={
              currentLocation && region.longitudeDelta
                ? region
                : currentLocation
            }
            showUserLocation={true}
            provider="google"
          >
            {/* this marker shows current location */}
            <MapView.Marker
              coordinate={currentLocation}
              title="Your current location"
            />{' '}
            {/* landmark markers below */}
            {landmarks.map((landmark) => {
              const coordinates = {
                latitude: landmark.geolocation.coordinates[1],
                longitude: landmark.geolocation.coordinates[0],
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              };
              return (
                <MapView.Marker
                  key={landmark._id}
                  onPress={() =>
                    this.setState({
                      screenHeight: halfHeight,
                      landmarkId: landmark._id,
                      landmarkName: landmark.landmark
                    })
                  }
                  title={`${landmark.landmark}`}
                  pinColor="darkslateblue"
                  coordinate={coordinates}
                />
              );
            })}
          </MapView>
        )}

        {landmarkId && landmarkName && userId ? (
          <Achievements
            userId={userId}
            landmarkName={landmarkName}
            landmarkId={landmarkId}
          />
        ) : null}

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          styleName="clear"
          leftComponent={
            <Button onPress={() => navigation.openDrawer()}>
              <Icon style={{ color: "black" }} name="sidebar" />
            </Button>
          }
          centerComponent={<Title style={{ color: 'black' }}>Map</Title>}
        />
      </View>
    );
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      const {
        cityId,
        latitude,
        longitude
      } = this.props.navigation.state.params;
      api.fetchLandmarksByCity(cityId).then((landmarks) => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          landmarks,
          screenHeight: height
        });
      });
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          isLoading: false
        });
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.setState({
        currentLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        },
        isLoading: false
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}

AppRegistry.registerComponent('MapScreen', () => MapScreen);

export default MapScreen;
