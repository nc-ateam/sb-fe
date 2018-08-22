import React, { Component } from "react";
import { View, NavigationBar, Icon, Title, Button } from "@shoutem/ui";
import { Dimensions, AppRegistry, StatusBar, Platform } from "react-native";
import { MapView } from "expo";
import * as api from "../api/api";

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

class MapScreen extends Component {
  state = {
    currentRegion: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    landmarks: [],
    isLoading: true
  };

  render() {
    const { landmarks, currentRegion, isLoading } = this.state;
    console.log(landmarks);
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ height: STATUSBAR_HEIGHT, backgroundColor: "lightgrey" }}
        >
          <StatusBar />
        </View>
        {!isLoading && (
          <MapView
            onMarkerPress={() => console.log("HIIIIIII")}
            style={{ flex: 1, height: height }}
            region={currentRegion}
            showUserLocation={true}
            provider="google"
          >
            <MapView.Marker coordinate={currentRegion} />
            {/* other markers go here */}

            {landmarks.map(landmark => {
              const coordinates = {
                latitude: landmark.geolocation.coordinates[1],
                longitude: landmark.geolocation.coordinates[0],
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
              };
              return (
                <MapView.Marker
                  key={landmark._id}
                  pinColor="darkslateblue"
                  coordinate={coordinates}
                />
              );
            })}
          </MapView>
        )}

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          styleName="clear"
          leftComponent={
            <Button onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={{ color: "black" }} name="sidebar" />
            </Button>
          }
          centerComponent={<Title style={{ color: "black" }}>Map</Title>}
        />
      </View>
    );
  }

  componentDidMount() {
    const cityID = "5b7d4ec4aa1bd63ca6aa1eec";

    navigator.geolocation.getCurrentPosition(
      position => {
        api.fetchLandmarksByCity(cityID).then(landmarks => {
          this.setState({
            currentRegion: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            },
            landmarks,
            isLoading: false
          });
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        currentRegion: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      });
    });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
}

AppRegistry.registerComponent("MapScreen", () => MapScreen);

export default MapScreen;
