import React from "react";
import { ImagePicker, Permissions } from "expo";
import { Button, Image, View, Alert, Text } from "react-native";
import * as firebase from "firebase";

class GalleryScreen extends React.Component {
  state = {
    image: null,
    username: "michaelJackson",
    firebase_URL: ""
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: "Images"
      });

      console.log(result, "<<<<<<<<<<<<");

      // this.setState({ image: result.uri }).then(() => {
      this.uploadImage(result.uri, "test-image")
        .then(() => {
          Alert.alert("SUCCESS");
        })
        .catch(error => {
          console.log(error);
          Alert.alert(error);
        });
    }
  };

  uploadImage = async (uri, imageName) => {
    console.log(`uploading image time`);
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const response = await fetch(uri);
      let result = await Expo.Location.getCurrentPositionAsync();
      const blob = await response.blob();
      let ref = firebase
        .storage()
        .ref()
        .child(`${this.state.username}` + `~${result.coords.longitude},${result.coords.latitude}~${this.state.username}`)
        .getDownloadURL()
        .then(url => {
          console.log(url)
          this.setState({ firebase_URL: url });

        })

      return ref.put(blob);
    }
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this.pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
    );
  }
}

export default GalleryScreen;
