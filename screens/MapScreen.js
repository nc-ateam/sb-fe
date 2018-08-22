import React, { Component } from "react";
import { View, NavigationBar, Icon, Title, Button } from "@shoutem/ui";
import { Dimensions, AppRegistry, StatusBar, Platform } from "react-native";
import { MapView } from "expo";

let { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

class MapScreen extends Component {
  state = {
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ height: STATUSBAR_HEIGHT, backgroundColor: "lightgrey" }}
        >
          <StatusBar />
        </View>
        <MapView
          onMarkerPress={() => console.log("HIIIIIII")}
          style={{ flex: 1, height: height }}
          region={this.state.region}
          showUserLocation={true}
          provider="google"
        >
          <MapView.Marker coordinate={this.state.region} />
        </MapView>

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          styleName="clear"
          leftComponent={
            <Button
              onPress={
                () => this.props.navigation.openDrawer() // styleName="clear"
              }
            >
              <Icon style={{ color: "black" }} name="sidebar" />
            </Button>
          }
          centerComponent={<Title style={{ color: "black" }}>Map</Title>}
        />
      </View>
    );
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }
        });
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    this.watchID = navigator.geolocation.watchPosition(position => {
      this.setState({
        region: {
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
