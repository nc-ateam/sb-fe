import React from 'react';
import {
  View,
  Text,
  NavigationBar,
  Icon,
  ImageBackground,
  Title,
  Button,
  Tile
} from '@shoutem/ui';
import { ScrollView } from 'react-native';
// import { RNCamera } from 'react-native-camera';

class PhotosScreen extends React.Component {
  testFunc = () => {
    console.log('Hello');
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View>
            <Button styleName="confirmation" onPress={() => this.testFunc()}>
              <Icon name="take-a-photo" />
            </Button>
          </View>
        </ScrollView>

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Button onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={<Title>Photo</Title>}
        />
      </View>
    );
  }
}

export default PhotosScreen;
