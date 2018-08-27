import React from "react";
import LogInScreen from "./screens/LogInScreen";
import { Constants } from "expo";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import { View, Text } from "@shoutem/ui";
import { ScrollView, Alert, Keyboard } from "react-native";
import MapScreen from "./screens/MapScreen";
import UserSettingsScreen from "./screens/UserSettingsScreen";
import CollectionsScreen from "./screens/CollectionsScreen";
import PhotosScreen from "./screens/PhotosScreen";
import * as firebase from "firebase"
import ApiKeys from "./config"

// if (!firebase.apps.length) { 
  firebase.initializeApp(ApiKeys.FirebaseConfig)
// }



class App extends React.Component {
  state = {
    loggedIn: false,
    testUser: {
      _id: "5b7ff102d149a1272a3ca322",
      visitedLandmarks: [],
      username: "Test",
      picture_url:
        "https://vignette.wikia.nocookie.net/disney/images/5/57/Jane_Porter_%28Vector%29.png/revision/latest?cb=20160803151057",
      fullname: "Jane Doe",
      email: "janeyD123@hotmail.com"
    },
    testPassword: "0"
  };
  render() {
    const { loggedIn, testUser } = this.state;
    return loggedIn ? (
      <DrawerNavigator screenProps={testUser._id} />
    ) : (
      <LogInScreen
        handleKeyDown={this.handleKeyDown}
        handleLogin={this.handleLogin}
      />
    );
  }

  handleLogin = (username, password) => {
    const { testUser, testPassword } = this.state;
    if (testUser.username === username && testPassword === password) {
      this.setState({ loggedIn: true });
    } else {
      Alert.alert("Invalid username/password");
    }
  };

  handleKeyDown = event => {
    if (event.nativeEvent.key === "Enter") {
      Keyboard.dismiss();
    }
  };
}

const DrawerNavigator = createDrawerNavigator(
  {
    Collections: CollectionsScreen,
    Map: MapScreen,
    Settings: UserSettingsScreen,
    Photo: PhotosScreen
  },
  {
    contentComponent: props => (
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            paddingTop: Constants.statusBarHeight,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 20
            }}
          >
            StampBook
          </Text>
        </View>
        <DrawerItems {...props} />
      </ScrollView>
    )
  }
);

export default App;
