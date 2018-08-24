import React, { Component } from "react";
import * as api from "../api/api";
import { ScrollView } from "react-native";
import {
  View,
  Text,
  NavigationBar,
  Button,
  Title,
  Icon,
  Tile,
  ImageBackground
} from "@shoutem/ui";

class CitiesByCountryScreen extends Component {
  state = {
    cities: [],
    isLoading: true
  };

  componentDidMount() {
    const { countryId } = this.props.navigation.state.params;

    api
      .fetchCitiesByCountry(countryId)
      .then(cities => this.setState({ cities, isLoading: false }));
  }

  render() {
    const { isLoading, cities } = this.state;
    const { screenProps, navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {!isLoading && (
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 250
            }}
          >
            {/* to return to previous Contries screen */}
            <Button
              style={{ marginTop: 20, marginBottom: 20 }}
              onPress={() => navigation.navigate("Countries")}
            >
              <Text>Go back to countries</Text>
            </Button>

            {cities.map(city => {
              return (
                <View key={city._id}>
                  <ImageBackground
                    styleName="featured"
                    source={{ uri: city.picture_url }}
                  >
                    <Tile>
                      <Button
                        onPress={() =>
                          this.props.navigation.navigate("Map", {
                            cityId: city._id,
                            latitude: city.geolocation.coordinates[1],
                            longitude: city.geolocation.coordinates[0]
                          })
                        }
                      >
                        <Text styleName="md-gutter-bottom">{city.city}</Text>
                      </Button>
                    </Tile>
                  </ImageBackground>
                </View>
              );
            })}
          </ScrollView>
        )}

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Button onPress={() => screenProps.openDrawer()}>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={<Title>Collections</Title>}
        />
      </View>
    );
  }
}

export default CitiesByCountryScreen;
