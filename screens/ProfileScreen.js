import React, { Component } from "react";
import {
  View,
  NavigationBar,
  Icon,
  Title,
  Text,
  Button,
  Image
} from "@shoutem/ui";
// import { Alert } from "react-native";

class ProfileScreen extends Component {
  render() {
    const { navigation, screenProps } = this.props;
    const { avatar, username, fullName, email, handleLogOut } = screenProps;
    console.log(handleLogOut);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          style={{ borderWidth: 0.5, borderColor: "black", marginBottom: 30 }}
          styleName="medium-avatar"
          source={{ uri: avatar }}
        />
        <Title style={{ marginTop: 10, marginBottom: 30 }}>{username}</Title>
        <View style={{ width: 250, height: 130 }}>
          <Text style={{ marginVertical: 10 }}>name: {fullName}</Text>
          <Text style={{ marginVertical: 10 }}>email: {email}</Text>
          <View />
        </View>
        <Button
          styleName="secondary"
          style={{ width: 90 }}
          onPress={() => handleLogOut()}
        >
          <Text>Log Out</Text>
        </Button>

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

export default ProfileScreen;
