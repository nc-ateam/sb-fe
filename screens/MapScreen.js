import React, { Component } from "react";
import { View, NavigationBar, Icon, Title, Button, Text } from "@shoutem/ui";
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
    landmarkName: "",
    refreshing: false
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
    const { onRefresh, visitedLandmarks } = this.props.navigation.state.params;

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ height: STATUSBAR_HEIGHT }}>
          <StatusBar />
        </View>

        {!isLoading && landmarks ? (
          <MapView
            followsUserLocation={true}
            style={{ marginTop: 50, height: screenHeight }}
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
                      landmarkName: landmark.landmark,
                      refresh: false
                    });
                  }}
                  title={`${landmark.landmark}`}
                  pinColor={
                    visitedLandmarks.includes(landmark._id)
                      ? "#f5a623"
                      : "darkslateblue"
                  }
                  coordinate={coordinates}
                />
              );
            })}
          </MapView>
        ) : null}
        {landmarkId && landmarkName && userId ? (
          <Achievements
            handleCloseButton={this.handleCloseButton}
            handleRefresh={this.handleRefresh}
            username={username}
            userId={userId}
            navigation={navigation}
            landmarkName={landmarkName}
            landmarkId={landmarkId}
            onRefresh={onRefresh}
          />
        ) : null}
        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          style={{ container: { borderBottomColor: "#BDBDBD" } }}
          leftComponent={
            <Button onPress={() => navigation.openDrawer()}>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={<Title>Map</Title>}
          rightComponent={
            <Button
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ color: "black", marginRight: 5 }}>Back</Text>
            </Button>
          }
        />
      </View>
    );
  }

  componentDidMount() {
    if (this.props.navigation.state.params) {
      const {
        cityId,
        latitude,
        longitude,
        visitedLandmarks
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
    this.setState({
      screenHeight: height,
      landmarkId: "",
      landmarkName: ""
    });
  };
}

AppRegistry.registerComponent("MapScreen", () => MapScreen);

export default MapScreen;
