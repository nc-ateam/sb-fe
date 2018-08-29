import React, { Component } from "react";
import {
  View,
  Text,
  NavigationBar,
  Icon,
  ImageBackground,
  Title,
  Button,
  Tile,
  Heading
} from "@shoutem/ui";
import { ScrollView } from "react-native";
import * as api from "../api/api";

class CountriesScreen extends Component {
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
    const { navigation } = this.props;
    const { countries, isLoading } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {!isLoading && (
          <ScrollView contentContainerStyle={{ paddingTop: 90 }}>
            <Heading style={{ textAlign: "center", paddingBottom: 20 }}>
              Choose a country
            </Heading>
            {countries.map(country => (
              <View
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingVertical: 5
                }}
                key={country._id}
              >
                <ImageBackground
                  styleName="featured"
                  source={{ uri: country.picture_url }}
                >
                  <Tile>
                    <Button
                      onPress={() =>
                        navigation.navigate("Cities", {
                          countryId: country._id
                        })
                      }
                    >
                      <Text styleName="md-gutter-bottom">
                        {country.country}
                      </Text>
                    </Button>
                  </Tile>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
        )}

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

export default CountriesScreen;
