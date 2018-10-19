import React from "react";
import "react-native";
import App from "../App";

import renderer from "react-test-renderer";

describe("<App />", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });
  it("creates a screenshot", () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
