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
import { ScrollView } from "react-native";
import * as api from "../api/api";
import { Router, Stack, Scene, Actions } from 'react-native-router-flux';
import CitiesByCountryScreen from "./CitiesByCountryScreen";
import MapScreen from './MapScreen';

class CollectionsScreen extends React.Component {
  state = {
    countries: [],
    isLoading: true
  };

  componentDidMount() {
    api
      .fetchAllCountries()
      .then(countries => this.setState({ countries, isLoading: false }));
  }

  render() {

    const { countries, isLoading } = this.state;
    return (

      <Router>
        <Stack key="root">
          <Scene key="cities" component={CitiesByCountryScreen} title="Cities" />
          <Scene key="map" component={MapScreen} title="Map" />
        </Stack>
      </Router> &&
      <View style={{ flex: 1 }}>
        {!isLoading && (
      

            <ScrollView
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {countries.map(country => (
                <View key={country._id}>
                  <Button onPress={() => Actions.cities({ countryId: country._id })}>
                    <ImageBackground
                      styleName="featured"
                      source={{ uri: country.picture_url }}
                    >
                      <Tile >
                        <Title styleName="md-gutter-bottom">
                          {country.country}
                        </Title>
                      </Tile>
                    </ImageBackground>
                  </Button>

                </View>
              ))}
            </ScrollView>
            
            {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
            <NavigationBar
              leftComponent={
                <Button onPress={() => this.props.navigation.openDrawer()}>
                  <Icon name="sidebar" />
                </Button>
              }
              centerComponent={<Title>Collections</Title>}
            />
     

        )}
      </View>

    )

  }
}


export default CollectionsScreen;
