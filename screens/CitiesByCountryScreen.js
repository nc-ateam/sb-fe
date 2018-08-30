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
  Image,
  Subtitle,
  Caption,
  Card,
  Heading
} from "@shoutem/ui";

class CitiesByCountryScreen extends Component {
  state = {
    cities: [],
    allLandmarks: [],
    isLoading: true,
    refresh: false
  };

  componentDidMount() {
    const { countryId } = this.props.navigation.state.params;

    api.fetchCitiesByCountry(countryId).then(cities => {
      cities
        ? cities.map(city => {
            if (city.city === "Manchester") {
              api.fetchLandmarksByCity(city._id).then(landmarks =>
                this.setState({
                  allLandmarks: landmarks
                })
              );
            }
            this.setState({
              cities,
              isLoading: false
            });
          })
        : null;
    });
  }

  render() {
    const { isLoading, cities, allLandmarks } = this.state;
    const { navigation, screenProps } = this.props;
    const { visitedLandmarks } = screenProps;

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {!isLoading && cities && allLandmarks ? (
          <ScrollView
            contentContainerStyle={{ paddingTop: 90, paddingBottom: 20 }}
          >
            <Heading style={{ textAlign: "center", paddingBottom: 20 }}>
              Choose a city
            </Heading>
            {cities.map(city => {
              const id = city._id;
              return (
                <ScrollView
                  style={{
                    paddingVertical: 8,
                    alignSelf: "center",
                    width: "85%"
                  }}
                  key={id}
                >
                  <Button
                    style={{
                      width: "100%",
                      height: 300,
                      paddingLeft: 0,
                      paddingRight: 0
                    }}
                    onPress={() =>
                      navigation.navigate("Map", {
                        cityId: id,
                        latitude: city.geolocation.coordinates[1],
                        longitude: city.geolocation.coordinates[0],
                        handleCitiesRefresh: this.handleCitiesRefresh
                      })
                    }
                  >
                    <Card
                      style={{
                        width: "100%",
                        borderColor: "#151515",
                        borderWidth: 1
                      }}
                    >
                      <Image
                        style={{
                          width: "100%",
                          height: "80%"
                        }}
                        source={{ uri: city.picture_url }}
                      />
                      <View styleName="content horizontal v-center space-between">
                        <Subtitle style={{ marginBottom: 0 }}>
                          {city.city}
                        </Subtitle>
                        {/* REMEMBER TO PUT PROGRESS IN */}
                        <Caption>
                          Progress:{" "}
                          {allLandmarks[0] !== undefined &&
                          allLandmarks[0].belongs_to._id === id
                            ? `${Math.round(
                                (visitedLandmarks.length /
                                  allLandmarks.length) *
                                  100
                              )}%`
                            : "0%"}
                        </Caption>
                      </View>
                    </Card>
                  </Button>
                </ScrollView>
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
            <Button
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={{ color: "black", marginRight: 5 }}>Back</Text>
            </Button>
          }
        />
      </View>
    );
  }

  handleCitiesRefresh = () => {
    this.setState({ refresh: true });
  };
}

export default CitiesByCountryScreen;
