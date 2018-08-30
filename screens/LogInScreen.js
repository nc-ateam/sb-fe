import React, { Component } from "react";
import { Font, AppLoading } from "expo";
import { Text, View, Button } from "@shoutem/ui";
import { TextInput, Image } from "react-native";
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
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ height: 150, marginTop: 130, marginBottom: 40 }}
            resizeMode="contain"
            source={require("../assets/SBLogo.png")}
          />

          <TextInput
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={{
              width: 200,
              height: 30,
              marginBottom: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#1C1C1C",
              textAlign: "center"
            }}
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
            onKeyPress={this.props.handleKeydown}
            autoCapitalize="none"
            placeholder={"Please enter your username"}
            placeholderTextColor="#424242"
          />

          <TextInput
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={{
              width: 200,
              height: 30,
              marginBottom: 50,
              borderBottomWidth: 1,
              borderBottomColor: "#424242",
              textAlign: "center"
            }}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            onKeyPress={this.props.handleKeydown}
            placeholder={"Please enter your password"}
            placeholderTextColor="#1C1C1C"
            autoCapitalize="none"
            secureTextEntry
          />

          <Button
            style={{
              width: 90,
              backgroundColor: "#491d66",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 3,
              elevation: 1,
              borderColor: "#491d66"
            }}
            onPress={() =>
              this.props.handleLogin(this.state.username, this.state.password)
            }
          >
            <Text style={{ color: "white" }}>Log In</Text>
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
