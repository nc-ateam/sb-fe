import React from "react";
import "react-native";
import CountriesScreen from "../screens/CountriesScreen";

import renderer from "react-test-renderer";

describe("<CountriesScreen />", () => {
  it("renders without crashing", () => {
    const rendered = renderer.create(<CountriesScreen />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it("creates a screenshot", () => {
    const rendered = renderer.create(<CountriesScreen />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
