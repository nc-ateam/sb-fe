import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { Image, View, Alert } from 'react-native';
import * as firebase from 'firebase';
import { NavigationBar, Icon, Title, Button, Text } from '@shoutem/ui';

class GalleryScreen extends React.Component {
  state = {
    image: null,
    photo_URL: ''
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'Images'
      });

      this.setState({ image: result.uri });
    }
  };

  uploadImage = async (uri, imageName) => {
    const { username, navigation } = this.props;
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const response = await fetch(this.state.image);
      let result = await Expo.Location.getCurrentPositionAsync();
      const blob = await response.blob();
      let filename = `~${result.coords.longitude},${
        result.coords.latitude
      }~${username}jpeg`;
      firebase
        .storage()
        .ref()
        .child(`${username}/` + filename)
        .put(blob)
        .then((response) => {
          firebase
            .storage()
            .ref(username)
            .child(filename)
            .getDownloadURL()
            .then((url) => {
              this.setState({ photo_URL: url }, () => {
                navigation.navigate('Map');
              });
            });
        });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { landmarkId } = this.props;
    if (prevState.photo_URL !== this.state.photo_URL) {
      console.log(this.state.photo_URL);
      fetch(
        `https://stamp-book-api.herokuapp.com/api/landmarks/${landmarkId}/checkLandmark`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ body: this.state.photo_URL })
        }
      )
        .then((response) => {
          console.log(response.status);
          // response.status - Error 400 for fail, 201 for pass.
          if (response.status === 400) {
            Alert.alert('You are not near the landmark!');
            return response.json();
          } else {
            Alert.alert('Photo uploaded!');
            return response.json();
          }
        })
        .then((responseJson) => {
          return responseJson.storedPhoto;
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    let { image } = this.state;
    const { navigation } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF'
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
            <Button onPress={() => navigation.openDrawer()}>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={<Title>Gallery</Title>}
          rightComponent={
            <Button onPress={() => navigation.goBack()}>
              <Text style={{ color: 'black', marginRight: 5 }}>Back</Text>
            </Button>
          }
        />
      </View>
    );
  }
}

export default GalleryScreen;
