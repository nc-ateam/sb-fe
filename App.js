import React from "react";
import LogInScreen from "./screens/LogInScreen";
import { Constants } from "expo";
import {
  createDrawerNavigator,
  DrawerItems,
  createStackNavigator
} from "react-navigation";
import { View, Text } from "@shoutem/ui";
import { ScrollView, Alert, Keyboard } from "react-native";
import MapScreen from "./screens/MapScreen";
import UserSettingsScreen from "./screens/UserSettingsScreen";
import PhotosScreen from "./screens/PhotosScreen";
import Achievements from "./components/Achievements";
import CountriesScreen from "./screens/CountriesScreen";
import CitiesByCountryScreen from "./screens/CitiesByCountryScreen";
import * as firebase from "firebase";
import * as api from "./api/api";
import ApiKeys from "./config";

// if (!firebase.apps.length) {
firebase.initializeApp(ApiKeys.FirebaseConfig);
// }

class App extends React.Component {
  state = {
    loggedIn: false,
    testUser: {},
    testPassword: ""
  };
  render() {
    const { loggedIn, testUser } = this.state;
    return loggedIn ? (
      <DrawerNavigator screenProps={{ userId: testUser._id }} />
    ) : (
      <LogInScreen
        handleKeyDown={this.handleKeyDown}
        handleLogin={this.handleLogin}
      />
    );
  }

  componentDidMount() {
    api
      .fetchAllUsers()
      .then(users => this.setState({ testUser: users[1], testPassword: "a" }));
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

const StackNavigator = createStackNavigator(
  {
    Countries: CountriesScreen,
    Cities: CitiesByCountryScreen,
    Map: MapScreen,
    Achievements: Achievements
  },
  {
    initialRouteName: "Countries",
    headerMode: "none"
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Collections: StackNavigator,
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
