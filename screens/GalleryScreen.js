import React from 'react';
import { ImagePicker, Permissions } from 'expo';
import { Image, View } from 'react-native';
import { NavigationBar, Icon, Title, Button, Text } from '@shoutem/ui';

class GalleryScreen extends React.Component {
  state = {
    image: null
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        mediaTypes: 'Images'
      });

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    }
  };

  render() {
    let { image } = this.state;

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
          <Button onPress={this.pickImage}>
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
