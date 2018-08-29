import React, { Component } from "react";
import { View, NavigationBar, Icon, Title, Text } from "@shoutem/ui";
// import { Alert } from "react-native";

class ProfileScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Coming soon!</Text>

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Icon onPress={() => navigation.openDrawer()} name="sidebar" />
          }
          centerComponent={<Title>Friend Activity</Title>}
        />
      </View>
    );
  }
}

export default ProfileScreen;
