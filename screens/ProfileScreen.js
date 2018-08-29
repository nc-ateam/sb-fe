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
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View>
          <Image
            style={{ borderWidth: 0.5, borderColor: "black", marginBottom: 30 }}
            styleName="medium-avatar"
            source={{ uri: avatar }}
          />
        </View>
        <Title style={{ marginTop: 10, marginBottom: 30 }}>{username}</Title>
        <View style={{ width: 250, height: 130 }}>
          <Text style={{ marginVertical: 10 }}>name: {fullName}</Text>
          <Text style={{ marginVertical: 10 }}>email: {email}</Text>
          <View />
        </View>
        <Button
          style={{
            width: 90,
            backgroundColor: "#491d66",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            elevation: 1,
            borderColor: "#491d66"
          }}
          onPress={() => handleLogOut()}
        >
          <Text style={{ color: "white" }}>Log Out</Text>
        </Button>

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Icon onPress={() => navigation.openDrawer()} name="sidebar" />
          }
          centerComponent={<Title>Profile</Title>}
        />
      </View>
    );
  }
}

export default ProfileScreen;
