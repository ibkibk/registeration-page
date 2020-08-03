import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Login from "./Login";

configure({ adapter: new Adapter() });

describe("<Login/>", () => {
  it("should render my component", () => {
    const wrapper = shallow(<Login />);
    // expect(wrapper.find(".FormField__Label")).text("");
  });
});
