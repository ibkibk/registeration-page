import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App.js";
import LoggedIn from "../Component/LoggedIn/LoggedIn";
import { NavLink } from "react-router-dom";

describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should render  <LoggedIn /> if user loggedIn", () => {
    expect(wrapper.find(LoggedIn));
  });
});
