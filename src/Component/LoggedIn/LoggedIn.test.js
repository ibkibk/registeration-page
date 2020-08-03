import React from "react";
import { shallow } from "enzyme";
import LoggedIn from "./LoggedIn";

describe("<LoggedIn/>", () => {
  it("should render my component", () => {
    shallow(<LoggedIn />);
    //   expect(wrapper.find(".FormField__Label")).text("");
  });
});
