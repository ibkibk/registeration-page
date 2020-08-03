import React from "react";
import ReactDOM from "react-dom";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "./App.js";
// import LoggedIn from "../Component/LoggedIn/LoggedIn";

configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// describe("<App/>", () => {
//   it("should render <LoggedIn/> if user is true");
//   const wrapper = shallow(<App />);
//   expect(wrapper.find(LoggedIn));
// });
