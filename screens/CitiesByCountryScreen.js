import React, { Component } from "react";
import * as api from '../api/api';
import { ScrollView } from 'react-native';
import { View, NavigationBar, Button, Title, Icon, Tile, ImageBackground } from '@shoutem/ui';


class CitiesByCountryScreen extends Component {
  state = {
    cities: [],
    isLoading: true
  };

  componentDidMount() {
    const { countryId } = this.props.navigation.state.params;
    if (countryId) {
      api.fetchCitiesByCountry(countryId).then(cities => this.setState({ cities, isLoading: false }));
    }
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {!isLoading && (
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        )}

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        {/* <NavigationBar
          leftComponent={
            <Button onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={<Title>Collections</Title>}
        /> */}
      </View>
    );
  }
}

export default CitiesByCountryScreen;
