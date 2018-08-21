import React, { Component } from "react";
import { View, NavigationBar, Icon, Title, Button } from "@shoutem/ui";
import { Dimensions, StatusBar } from "react-native";
import { MapView } from "expo";

StatusBar.setBarStyle("light-content", true);
class MapScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1, height: Dimensions.get("window").height }}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
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
}

export default MapScreen;
