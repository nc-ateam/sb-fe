import React from "react";
import LogInScreen from "./screens/LogInScreen";
import { createStackNavigator } from "react-navigation";
import CollectionsScreen from "./screens/CollectionsScreen";
import MapScreen from "./screens/MapScreen";
import UserSettingsScreen from "./screens/UserSettingsScreen";

const App = createStackNavigator(
  {
    LogInScreen: LogInScreen,
    Collections: CollectionsScreen,
    Achievements: MapScreen,
    Settings: UserSettingsScreen
  },
  {
    initialRouteName: "LogInScreen",
    headerMode: "none"
  }
);

export default App;
