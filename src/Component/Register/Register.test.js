import React from "react";
import { shallow } from "enzyme";
import Register from "./Register";

describe("<Register />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Register />);
  });

  it("should render <Register /> when receiving user data ", () => {
    expect(wrapper.find("input")).toHaveLength(5);
  });
  it("should render <Register /> when receiving user data ", () => {
    expect(wrapper.find("button")).toHaveLength(2);
  });
});
