import React, { Component } from "react";
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
    // console.log(this.props.navigation, "sfkeyeiuiwpeirpwieriwu");
    const { screenProps } = this.props;
    const { countries, isLoading } = this.state;
    return (
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
                <ImageBackground
                  styleName="featured"
                  source={{ uri: country.picture_url }}
                >
                  <Tile>
                    <Title
                      onPress={() =>
                        this.props.navigation.navigate("Cities", {
                          countryId: country._id
                        })
                      }
                      styleName="md-gutter-bottom"
                    >
                      {country.country}
                    </Title>
                  </Tile>
                </ImageBackground>
              </View>
            ))}
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

export default CountriesScreen;
