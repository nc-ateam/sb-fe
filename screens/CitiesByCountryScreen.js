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
  ImageBackground,
  Heading
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
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {!isLoading && cities ? (
          <ScrollView contentContainerStyle={{ paddingTop: 60 }}>
            {/* to return to previous Contries screen */}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                style={{ marginTop: 40, marginBottom: 10, width: 150 }}
                onPress={() => navigation.goBack()}
              >
                <Text>{"< Countries"}</Text>
              </Button>
            </View>

            <Heading style={{ textAlign: "center" }}>Choose a city</Heading>
            {cities.map(city => {
              return (
                <View
                  style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingVertical: 5
                  }}
                  key={city._id}
                >
                  <ImageBackground
                    styleName="featured"
                    source={{ uri: city.picture_url }}
                  >
                    <Tile>
                      <Button
                        onPress={() =>
                          navigation.navigate("Map", {
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
        ) : null}

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Button onPress={() => navigation.openDrawer()}>
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
