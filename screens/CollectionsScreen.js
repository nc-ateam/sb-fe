import React from "react";
import {
  View,
  Text,
  NavigationBar,
  Icon,
  ImageBackground,
  Title,
  Button,
  Tile
} from "@shoutem/ui";
import { ScrollView } from "react-native";
import CountryApi from "../api/mockCountryApi";

class CollectionsScreen extends React.Component {
  state = {
    data: {}
  };

  // This is an example of calling the mockApi, this will need to be changed to something like Axios or whatever we choose for the remote API.
  componentDidMount = async () => {
    let data = await CountryApi.getAllCountries();
    this.setState({
      data
    });
  };

  render() {
    const { data } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View>
            {data[0] &&
              data.map(country => (
                <View key={country._id}>
                  <ImageBackground
                    styleName="featured"
                    source={{ uri: country.avatar_url }}
                  >
                    <Tile>
                      <Title styleName="md-gutter-bottom">
                        {country.country}
                      </Title>
                    </Tile>
                  </ImageBackground>
                </View>
              ))}
          </View>
        </ScrollView>

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Button onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="sidebar" />
            </Button>
          }
          centerComponent={<Title>Collections</Title>}
        />
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });

export default CollectionsScreen;
