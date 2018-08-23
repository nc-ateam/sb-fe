import React from "react";
import { ImagePicker, Permissions } from "expo";
import { Button, Image, View } from "react-native";


class GalleryScreen extends React.Component {
  state = {
    image: null
  };

  pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if(status === 'granted'){
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      mediaTypes: "Images"
    });
  

    console.log(result, "<<<<<<<<<<<<");
  

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
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
