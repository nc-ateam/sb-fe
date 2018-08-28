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
    const {
      landmarkName,
      landmarkId,
      navigation,
      username,
      handleCloseButton
    } = this.props;
    return !isLoading ? (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }} />
          <View>
            <Button
              styleName="clear"
              style={{
                width: 60,
                marginBottom: 15,
                marginRight: 0,
                marginTop: 15,
                alignSelf: "flex-end"
              }}
              onPress={() => handleCloseButton()}
            >
              <Icon name="close" />
            </Button>
          </View>

          {!photo ? (
            <View>
              <Heading style={{ textAlign: "center" }}>{landmarkName}</Heading>
              <Text style={{ textAlign: "center" }}>Not collected</Text>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
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
                    height: 60,
                    borderWidth: 1,
                    borderColor: "#d6d7da"
                  }}
                >
                  <Icon name="take-a-photo" />
                </Button>
              </View>
            </View>
          ) : (
            <View>
              <Heading style={{ textAlign: "center" }}>{landmarkName}</Heading>
              <Text style={{ textAlign: "center" }}>Collected</Text>
              <Icon
                style={{ color: "green", marginTop: 10 }}
                name="checkbox-on"
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 20,
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
                    source={{
                      uri: `${
                        photo.firebase_url // resizeMode="contain"
                      }`
                    }}
                  />
                </Lightbox>
              </View>
            </View>
          )}
        </View>
      </View>
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
