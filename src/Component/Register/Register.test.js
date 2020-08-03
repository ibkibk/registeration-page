import React from "react";
import { shallow } from "enzyme";
import Register from "./Register";

describe("<Register/>", () => {
  test("should render my component", () => {
    const wrapper = shallow(<Register />);
    // expect(wrapper.find(".FormField__Label")).text("");
  });
});
