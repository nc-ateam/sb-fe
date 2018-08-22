import React from 'react';
import { Image, View, ScrollView } from 'react-native';

class GalleryScreen extends React.Component {
  render() {
    return (
      <View>
        <ScrollView>
          {this.props.photos((p, i) => {
            return (
              <Image
                key={i}
                style={{ width: 300, height: 100 }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default GalleryScreen;
