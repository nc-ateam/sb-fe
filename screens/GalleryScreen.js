import React from "react";
import { ImagePicker, Permissions } from "expo";
import { Image, View, Alert } from "react-native";
import * as firebase from "firebase";
import { NavigationBar, Icon, Title, Button, Text } from "@shoutem/ui";

class GalleryScreen extends React.Component {
  state = {
    image: null,
    username: "brommers",
    photo_URL: "",
    image: ''
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: "Images"
      });

      this.setState({ image: result.uri })
        .then(() => {
          Alert.alert("SUCCESS");
        })
        .catch(error => {
          console.log(error);
          Alert.alert(error);
        });
      }
  };

  uploadImage = async () => {
    console.log(this.state.image)
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const response = await fetch(this.state.image);
      let result = await Expo.Location.getCurrentPositionAsync();
      const blob = await response.blob();
      let filename = `~${result.coords.longitude},${result.coords.latitude}~${
        this.state.username
      }jpeg`;
      firebase
        .storage()
        .ref()
        .child(`${this.state.username}/` + filename)
        .put(blob)
        .then(response => {
          firebase
            .storage()
            .ref(this.state.username)
            .child(filename)
            .getDownloadURL()
            .then(url => {
              this.setState({ photo_URL: url });
            });
        });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.photo_URL !== this.state.photo_URL) {
      fetch(
        "https://stamp-book-api.herokuapp.com/api/landmarks/5b7ff102d149a1272a3ca318/checkLandmark",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ body: this.state.photo_URL })
        }
      )
        .then(response => {
          return response.json();
        })
        .then(responseJson => {
          return responseJson.storedPhoto;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  render() {
    let { image } = this.state;

    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FFFFFF"
        }}
      >
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button onPress={this.pickImage}>
          <Text>Pick Image</Text>
        </Button>
        {this.state.image ? (
          <Button onPress={this.uploadImage}>
            <Text>Upload Image</Text>
          </Button>
        ) : null}
        <NavigationBar
          leftComponent={
            <Button onPress={() => this.props.screenProps.openDrawer()}>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={<Title>Gallery</Title>}
        />
      </View>
    );
  }
}

export default GalleryScreen;
