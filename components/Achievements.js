import React, { Component } from "react";
import {
  View,
  Text,
  NavigationBar,
  Icon,
  Image,
  Heading,
  Button
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
    console.log(photo);
    return !isLoading ? (
      !photo ? (
        <View style={{ flex: 1 }}>
          <View style={{ paddingTop: 50 }}>
            {/* remove button when component is integrated into MapScreen */}
            <Button onPress={() => this.props.navigation.goBack()}>
              <Text>Back to map</Text>
            </Button>
            <Heading>{landmarkName}</Heading>
            <Text>Not collected</Text>
            <Button>
              <Icon name="take-a-photo" />
            </Button>
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
    const userId = "5b7d4ec4aa1bd63ca6aa1ef9";
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
