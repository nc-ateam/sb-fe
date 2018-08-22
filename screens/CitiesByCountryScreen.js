import React, { Component } from "react";

class CitiesByCountryScreen extends Component {
  state = {
    cities: [],
    isLoading: true
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {!isLoading && (
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        )}

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

export default CitiesByCountryScreen;
