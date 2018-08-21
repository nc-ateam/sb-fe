import React, { Component } from 'react';
import { View, NavigationBar, Icon, Title, Text, Button } from '@shoutem/ui';
import { ScrollView } from 'react-native';
import CountryApi from '../api/mockCountryApi';

class UserSettingsScreen extends Component {
  state = {
    data: {}
  };

  // This is an example of calling the mockApi, this will need to be changed to something like Axios or whatever we choose for the remote API.
  componentDidMount = async () => {
    let data = await CountryApi.getAllCountries();
    this.setState({
      data
    });
    console.log(this.state.data);
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
            <Text>Settings go here</Text>
          </View>
        </ScrollView>

        {/* navigation bar should stay at the bottom otherwise {flex: 1} causes button to not work */}
        <NavigationBar
          leftComponent={
            <Icon
              onPress={() => this.props.navigation.openDrawer()}
              name="sidebar"
            />
          }
          centerComponent={<Title>Settings</Title>}
        />
      </View>
    );
  }
}

export default UserSettingsScreen;
