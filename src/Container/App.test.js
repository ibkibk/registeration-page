import React from "react";
import ReactDOM from "react-dom";
import { shallow } from "enzyme";
import App from "./App.js";
import LoggedIn from "../Component/LoggedIn/LoggedIn";
import { NavLink } from "react-router-dom";

// it("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
describe("<App />", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should render  <LoggedIn /> if user loggedIn", () => {
    expect(wrapper.find(LoggedIn));
  });
  it("should render  <NavLink /> if user is not loggedIn", () => {
    expect(wrapper.find(NavLink)).toHaveLength(2);
  });
});
