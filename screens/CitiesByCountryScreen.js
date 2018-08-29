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
  Image,
  Subtitle,
  Caption,
  Card,
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
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {!isLoading && cities ? (
          <ScrollView contentContainerStyle={{ paddingTop: 90 }}>
            <Heading style={{ textAlign: "center", paddingBottom: 20 }}>
              Choose a city
            </Heading>
            {cities.map(city => {
              return (
                <View
                  style={{
                    paddingVertical: 8,
                    alignSelf: "center",
                    width: "85%"
                  }}
                  key={city._id}
                >
                  <Button
                    style={{
                      width: "100%",
                      paddingLeft: 0,
                      paddingRight: 0
                    }}
                    onPress={() =>
                      navigation.navigate("Map", {
                        cityId: city._id,
                        latitude: city.geolocation.coordinates[1],
                        longitude: city.geolocation.coordinates[0]
                      })
                    }
                  >
                    <Card
                      style={{
                        width: "100%",
                        borderColor: "#BDBDBD",
                        borderWidth: 1
                      }}
                    >
                      <Image
                        style={{ width: "100%", height: "80%" }}
                        source={{ uri: city.picture_url }}
                      />
                      <View styleName="content">
                        <Subtitle>{city.city}</Subtitle>
                        <Caption>Progress</Caption>
                      </View>
                    </Card>
                  </Button>

                  {/* <ImageBackground
                    styleName="featured"
                    source={{ uri: city.picture_url }}
                  >
                    <Tile>
                      <Button
                        style={{ borderColor: "black", borderRadius: 3 }}
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
                  </ImageBackground> */}
                </View>
              );
            })}
          </ScrollView>
        ) : null}

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          style={{ container: { borderBottomColor: "#BDBDBD" } }}
          leftComponent={
            <Button onPress={() => navigation.openDrawer()}>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={<Title>Collections</Title>}
          rightComponent={
            <Button onPress={() => navigation.goBack()}>
              <Text style={{ color: "black", marginRight: 5 }}>Back</Text>
            </Button>
          }
        />
      </View>
    );
  }
}

export default CitiesByCountryScreen;
