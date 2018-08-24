import React, { Component } from "react";
import {
  View,
  Text,
  NavigationBar,
  Icon,
  Image,
  Heading,
  Button,
  ListView
} from "@shoutem/ui";
import * as api from "../api/api";

class Achievements extends Component {
  state = {
    photo: {},
    isLoading: true
  };

  render() {
    const { isLoading, photo } = this.state;
    const landmarkName = "Northcoders";
    return !isLoading ? (
      !photo ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingTop: 50 }}>
            {/* remove button when component is integrated into MapScreen */}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                style={{
                  marginTop: 40,
                  marginBottom: 30,
                  width: 150,
                  height: 50
                }}
                onPress={() => this.props.navigation.goBack()}
              >
                <Text>Back to map</Text>
              </Button>
            </View>

            <View>
              <Heading style={{ textAlign: "center" }}>{landmarkName}</Heading>
              <Text style={{ textAlign: "center" }}>Not collected</Text>
            </View>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                style={{
                  marginTop: 40,
                  marginBottom: 10,
                  width: 60,
                  height: 60
                }}
              >
                <Icon name="take-a-photo" />
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ paddingTop: 50 }}>
            <Heading>{landmarkName}</Heading>
            <Image
              styleName="featured"
              source={{ uri: `${photo.firebase_url}` }}
            />
          </View>
        </View>
      )
    ) : null;
  }

  componentDidMount() {
    const userId = "5b7ff102d149a1272a3ca322";
    const { landmarkId } = this.props.navigation.state.params;
    api.fetchAllPhotosByUser(userId).then(photos => {
      const singlePhoto = photos.filter(
        photo => photo.belongs_to_landmark === landmarkId
      );
      this.setState({
        photo: singlePhoto[0],
        isLoading: false
      });
    });
  }
}

export default Achievements;
