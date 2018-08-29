import React, { Component } from "react";
import {
  View,
  Text,
  Icon,
  Heading,
  Button,
  Lightbox,
  Subtitle
} from "@shoutem/ui";
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
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopColor: "#BDBDBD",
          borderTopWidth: 1
        }}
      >
        <View style={{ flex: 1 }}>
          <View style={{ justifyContent: "center", alignItems: "center" }} />
          <View>
            <Button
              styleName="clear"
              style={{
                width: 60,
                marginBottom: 8,
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
              <View
                style={{
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  marginTop: 15,
                  marginBottom: 15,
                  borderBottomColor: "#f5a623",
                  width: 150
                }}
              />
              <Text style={{ textAlign: "center" }}>Not collected</Text>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Button
                  onPress={() => {
                    navigation.navigate("Photo", {
                      landmarkId,
                      username
                    });
                    handleCloseButton();
                  }}
                  style={{
                    marginTop: 40,
                    marginBottom: 10,
                    width: 60,
                    height: 50,
                    backgroundColor: "#491d66",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    elevation: 1,
                    borderColor: "#491d66"
                  }}
                >
                  <Icon style={{ color: "white" }} name="take-a-photo" />
                </Button>
              </View>
            </View>
          ) : (
            <View>
              <Heading style={{ textAlign: "center" }}>{landmarkName}</Heading>

              <View
                style={{
                  alignSelf: "center",
                  borderBottomWidth: 1,
                  marginTop: 15,
                  marginBottom: 10,
                  borderBottomColor: "#f5a623",
                  width: 150
                }}
              />

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Subtitle
                  style={{
                    textAlign: "center",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingRight: 5
                  }}
                >
                  Collected{" "}
                </Subtitle>
                <Icon style={{ color: "green" }} name="checkbox-on" />
              </View>

              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 15,
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
                    style={{
                      width: 180,
                      height: 180
                    }}
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
