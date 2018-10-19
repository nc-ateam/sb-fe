import React from "react";
import "react-native";
import GalleryScreen from "../screens/GalleryScreen";

import renderer from "react-test-renderer";

describe("<GalleryScreen />", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<GalleryScreen />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it("creates a screenshot", () => {
    const rendered = renderer.create(<GalleryScreen />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
