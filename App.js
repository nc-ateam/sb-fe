import React from "react";
import LogInScreen from "./screens/LogInScreen";
import {
  createDrawerNavigator,
  DrawerItems,
  createStackNavigator
} from "react-navigation";
import { View } from "@shoutem/ui";
import { Alert, Keyboard, Image } from "react-native";
import MapScreen from "./screens/MapScreen";
import FriendActivityScreen from "./screens/FriendActivityScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PhotosScreen from "./screens/PhotosScreen";
import Achievements from "./components/Achievements";
import CountriesScreen from "./screens/CountriesScreen";
import CitiesByCountryScreen from "./screens/CitiesByCountryScreen";
import * as firebase from "firebase";
import * as api from "./api/api";
import ApiKeys from "./config";

firebase.initializeApp(ApiKeys.FirebaseConfig);

class App extends React.Component {
  state = {
    loggedIn: false,
    testUser: {},
    testPassword: ""
  };
  render() {
    const { loggedIn, testUser } = this.state;
    return loggedIn ? (
      <DrawerNavigator
        screenProps={{
          userId: testUser._id,
          username: testUser.username,
          avatar: testUser.picture_url,
          fullName: testUser.fullname,
          email: testUser.email,
          handleLogOut: this.handleLogOut,
          visitedLandmarks: testUser.visitedLandmarks
        }}
      />
    ) : (
      <LogInScreen
        handleKeyDown={this.handleKeyDown}
        handleLogin={this.handleLogin}
      />
    );
  }

  componentDidMount() {
    api.fetchAllUsers().then(users =>
      this.setState({
        testUser: {
          ...users[1],
          visitedLandmarks: users[1].visitedLandmarks.filter(
            (item, position, self) => self.indexOf(item) === position
          )
        },
        testPassword: "a"
      })
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
  handleLogOut = () => {
    this.setState({
      loggedIn: false
    });
    Alert.alert("You have successfully logged out");
  };
}

const StackNavigator = createStackNavigator(
  {
    Countries: CountriesScreen,
    Cities: CitiesByCountryScreen,
    Map: MapScreen,
    Achievements: Achievements,
    Photo: PhotosScreen,
    LogIn: LogInScreen
  },
  {
    initialRouteName: "Countries",
    headerMode: "none"
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Collections: StackNavigator,
    "Friend Activity": FriendActivityScreen,
    Profile: ProfileScreen
  },
  {
    contentComponent: props => (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 150,
            backgroundColor: "white",
            marginTop: 50,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image
            style={{ height: 100 }}
            resizeMode="contain"
            source={require("./assets/SBLogo.png")}
          />
        </View>
        <DrawerItems {...props} />
      </View>
    )
  }
);

export default App;
