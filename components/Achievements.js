import React, { Component } from "react";
import {
  View,
  Text,
  NavigationBar,
  Icon,
  Image,
  Title,
  Button,
  Tile
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
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 50 }}>
          <Text>{landmarkName}</Text>
          <Image
            styleName="featured"
            source={{ uri: `${photo.firebase_url}` }}
          />
        </View>
      </View>
    ) : null;
  }

  componentDidMount() {
    const userId = "5b7d4ec4aa1bd63ca6aa1ef9";
    const landmarkId = "5b7d4ec4aa1bd63ca6aa1ef0";
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
