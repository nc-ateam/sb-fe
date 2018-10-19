import React from "react";
import "react-native";
import LogInScreen from "../screens/LogInScreen";

import renderer from "react-test-renderer";

describe("<LogInScreen />", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<LogInScreen />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it("creates a screenshot", () => {
    const rendered = renderer.create(<LogInScreen />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
