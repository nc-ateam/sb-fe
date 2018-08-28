import React, { Component } from "react";
import { View, NavigationBar, Icon, Title, Button } from "@shoutem/ui";
import { Dimensions, AppRegistry, StatusBar, Platform } from "react-native";
import { MapView } from "expo";
import * as api from "../api/api";
import Achievements from "../components/Achievements";

const { height } = Dimensions.get("window");
const thirdOfScreenHeight = height / 3;
const DELTA = 0.06;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

class MapScreen extends Component {
  state = {
    region: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    currentLocation: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    landmarks: [],
    isLoading: true,
    screenHeight: 0,
    landmarkId: "",
    landmarkName: ""
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
    const { userId, username } = screenProps;
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ height: STATUSBAR_HEIGHT, backgroundColor: "lightgrey" }}
        >
          <StatusBar />
        </View>

        {!isLoading && (
          <MapView
            followsUserLocation={true}
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
            />{" "}
            {/* landmark markers below */}
            {landmarks.map(landmark => {
              const coordinates = {
                latitude: landmark.geolocation.coordinates[1],
                longitude: landmark.geolocation.coordinates[0]
              };
              return (
                <MapView.Marker
                  key={landmark._id}
                  onPress={e => {
                    const { coordinate } = e.nativeEvent;
                    this.setState({
                      region: {
                        longitude: coordinate.longitude,
                        latitude: coordinate.latitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.04
                      },
                      screenHeight: thirdOfScreenHeight,
                      landmarkId: landmark._id,
                      landmarkName: landmark.landmark
                    });
                  }}
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
            handleCloseButton={this.handleCloseButton}
            username={username}
            userId={userId}
            navigation={navigation}
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
          centerComponent={<Title style={{ color: "black" }}>Map</Title>}
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
      api.fetchLandmarksByCity(cityId).then(landmarks => {
        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: DELTA,
            longitudeDelta: DELTA
          },
          landmarks,
          screenHeight: height
        });
      });
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: DELTA,
            longitudeDelta: DELTA
          },
          isLoading: false
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        currentLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: DELTA,
          longitudeDelta: DELTA
        },
        isLoading: false
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  handleCloseButton = () => {
    this.setState({ screenHeight: height });
  };
}

AppRegistry.registerComponent("MapScreen", () => MapScreen);

export default MapScreen;
