import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LoggedIn from "./LoggedIn";

configure({ adapter: new Adapter() });

describe("<LoggedIn/>", () => {
  it("should render my component", () => {
    const wrapper = shallow(<LoggedIn />);
    // expect(wrapper.find(".FormField__Label")).text("");
  });
});
