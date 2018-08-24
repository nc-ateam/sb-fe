import React, { Component } from "react";
import { Font, AppLoading } from "expo";
import { Text, View, Heading, Button, Icon } from "@shoutem/ui";
import { TextInput } from "react-native";
import { Constants } from "expo";

class LogInScreen extends Component {
  state = {
    fontsAreLoaded: false,
    username: "",
    password: ""
  };

  render() {
    if (!this.state.fontsAreLoaded) {
      return <AppLoading />;
    }
    return (
      <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 170
          }}
        >
          <Heading>StampBook</Heading>
          <Icon style={{ paddingTop: 17, paddingBottom: 25 }} name="books" />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <TextInput
              style={{ width: 200, height: 30, marginVertical: 10 }}
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              onKeyPress={this.props.handleKeydown}
              placeholder={"Please enter your username"}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <TextInput
              style={{ width: 200, height: 30, marginVertical: 10 }}
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              onKeyPress={this.props.handleKeydown}
              placeholder={"Please enter your password"}
              secureTextEntry
            />
          </View>

          <Button
            onPress={() =>
              this.props.handleLogin(this.state.username, this.state.password)
            }
          >
            <Text>SUBMIT</Text>
          </Button>
        </View>
      </View>
    );
  }

  async componentWillMount() {
    await Font.loadAsync({
      "Rubik-Black": require("../node_modules/@shoutem/ui/fonts/Rubik-Black.ttf"),
      "Rubik-BlackItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf"),
      "Rubik-Bold": require("../node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf"),
      "Rubik-BoldItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf"),
      "Rubik-Italic": require("../node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf"),
      "Rubik-Light": require("../node_modules/@shoutem/ui/fonts/Rubik-Light.ttf"),
      "Rubik-LightItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf"),
      "Rubik-Medium": require("../node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf"),
      "Rubik-MediumItalic": require("../node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf"),
      "Rubik-Regular": require("../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf")
    });

    this.setState({ fontsAreLoaded: true });
  }
}

export default LogInScreen;
