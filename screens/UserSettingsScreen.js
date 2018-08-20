import React, { Component } from "react";
import { View, NavigationBar, Icon, Title } from "@shoutem/ui";

class UserSettingsScreen extends Component {
  render() {
    return (
      <View>
        <NavigationBar
          leftComponent={<Icon name="sidebar" />}
          centerComponent={<Title>Settings</Title>}
        />
      </View>
    );
  }
}

export default UserSettingsScreen;
