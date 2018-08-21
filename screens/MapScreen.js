import React, { Component } from "react";
import { View, NavigationBar, Icon, Title, Text } from "@shoutem/ui";
import { ScrollView } from "react-native";

class MapScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View>
            <Text>Map and achievements go here</Text>
          </View>
        </ScrollView>

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Icon
              onPress={() => this.props.navigation.openDrawer()}
              name="sidebar"
            />
          }
          centerComponent={<Title>Map</Title>}
        />
      </View>
    );
  }
}

export default MapScreen;
