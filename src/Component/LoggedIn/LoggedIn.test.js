import React from "react";
import { shallow } from "enzyme";
import LoggedIn from "./LoggedIn";

describe("<LoggedIn/>", () => {
  const container = shallow(<LoggedIn />);

  it("should have button to logout", () => {
    expect(container.find("button"));
  });
});
