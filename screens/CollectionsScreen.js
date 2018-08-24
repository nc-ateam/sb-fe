import React from "react";
import { createStackNavigator } from "react-navigation";
import CitiesByCountryScreen from "./CitiesByCountryScreen";
import CountriesScreen from "./CountriesScreen";
import MapScreen from "./MapScreen";
import Achievements from "../components/Achievements";

class CollectionsScreen extends React.Component {
  render() {
    return <StackNavigator screenProps={this.props.navigation} />;
  }
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
export default CollectionsScreen;
