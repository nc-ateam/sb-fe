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
import MapScreen from "./MapScreen";

class CollectionsScreen extends React.Component {
  render() {
    return <StackNavigator screenProps={this.props.navigation} />;
  }
}

const StackNavigator = createStackNavigator(
  {
    Countries: CountriesScreen,
    Cities: CitiesByCountryScreen,
    Map: MapScreen
  },
  {
    initialRouteName: "Countries",
    headerMode: "none"
  }
);
export default CollectionsScreen;
