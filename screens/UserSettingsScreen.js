import React, { Component } from "react";
import { View, NavigationBar, Icon, Title, Text, Button } from "@shoutem/ui";
import { ScrollView } from "react-native";

class UserSettingsScreen extends Component {
  render() {
    const { navigation } = this.props;
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
            <Text>Settings go here</Text>
          </View>
        </ScrollView>

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Icon onPress={() => navigation.openDrawer()} name="sidebar" />
          }
          centerComponent={<Title>Settings</Title>}
        />
      </View>
    );
  }
}

export default UserSettingsScreen;
