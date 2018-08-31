import React from "react";
import "react-native";
import PhotosScreen from "../screens/PhotosScreen";

import renderer from "react-test-renderer";

describe("<PhotosScreen />", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<PhotosScreen />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it("creates a screenshot", () => {
    const rendered = renderer.create(<PhotosScreen />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
