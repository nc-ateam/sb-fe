import React, { Component } from "react";
import { View, Text, Icon, Heading, Button, Lightbox } from "@shoutem/ui";
import * as api from "../api/api";
import { Image } from "react-native";

class Achievements extends Component {
  state = {
    photo: {},
    isLoading: true
  };

  render() {
    const { isLoading, photo } = this.state;
    const { landmarkName, landmarkId, navigation, username } = this.props;
    return !isLoading ? (
      !photo ? (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, paddingTop: 50 }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            />

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
                onPress={() =>
                  navigation.navigate("Photo", {
                    landmarkId,
                    username
                  })
                }
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
          <View style={{ paddingTop: 30 }}>
            <Heading style={{ textAlign: "center" }}>{landmarkName}</Heading>
            <Text style={{ textAlign: "center", fontWeight: "700" }}>
              Collected
            </Text>
            <Icon
              style={{ color: "green", marginTop: 20 }}
              name="checkbox-on"
            />
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 30,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
                elevation: 1
              }}
            >
              <Lightbox
                activeProps={{
                  resizeMode: "contain",
                  flex: 1,
                  width: null,
                  height: null
                }}
              >
                <Image
                  style={{ width: 200, height: 200 }}
                  // resizeMode="contain"
                  source={{
                    uri: `${photo.firebase_url}`
                  }}
                />
              </Lightbox>
            </View>
          </View>
        </View>
      )
    ) : null;
  }

  componentDidMount() {
    const { landmarkId, userId } = this.props;
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

  componentDidUpdate(prevState) {
    const { landmarkId, userId } = this.props;
    if (prevState.landmarkId !== landmarkId) {
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
}

export default Achievements;
