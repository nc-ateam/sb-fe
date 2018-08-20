import React, { Component } from "react";
import { Font, AppLoading } from "expo";
import { Text, View, Heading, TextInput, Button } from "@shoutem/ui";

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
      <View>
        <Heading>StampBook</Heading>
        <Text>Username: </Text>{" "}
        <TextInput
          value={this.state.username}
          onChangeText={username =>
            this.setState({ username }, console.log(this.state.username))
          }
          placeholder={"Please enter your username"}
        />
        <Text>Password: </Text>{" "}
        <TextInput
          value={this.state.password}
          onChangeText={password =>
            this.setState({ password }, console.log(this.state.password))
          }
          placeholder={"Please enter your password"}
          secureTextEntry
        />
        <View>
          <Button>
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
