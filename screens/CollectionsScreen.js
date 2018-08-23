import React from "react";
import {
  View,
  Text,
  NavigationBar,
  Icon,
  ImageBackground,
  Title,
  Button,
  Tile
} from "@shoutem/ui";

import { createStackNavigator } from "react-navigation";
import CitiesByCountryScreen from "./CitiesByCountryScreen";
import CountriesScreen from "./CountriesScreen";

class CollectionsScreen extends React.Component {
  render() {
    return <StackNavigator />;
  }
}

const StackNavigator = createStackNavigator(
  {
    Countries: CountriesScreen,
    Cities: CitiesByCountryScreen
  },
  {
    initialRouteName: "Countries",
    headerMode: false
  }
);
export default CollectionsScreen;
