import React from "react";
import "react-native";
import FriendActivityScreen from "../screens/FriendActivityScreen";

import renderer from "react-test-renderer";

describe("<FriendActivityScreen />", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<FriendActivityScreen />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it("creates a screenshot", () => {
    const rendered = renderer.create(<FriendActivityScreen />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
