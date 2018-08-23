import React from "react";
import LogInScreen from "./screens/LogInScreen";
import { Constants } from "expo";
import { createDrawerNavigator, DrawerItems } from "react-navigation";
import { View, Text } from "@shoutem/ui";
import { ScrollView } from "react-native";
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
    loggedIn: false
  };
  render() {
    return this.state.loggedIn ? (
      <DrawerNavigator />
    ) : (
      <LogInScreen handleLogin={this.handleLogin} />
    );
  }

  handleLogin = () => {
    this.setState({ loggedIn: true });
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
        <DrawerItems {...props} />>
      </ScrollView>
    )
  }
);

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",

//     backgroundColor: "#ecf0f1"
//   }
// });
