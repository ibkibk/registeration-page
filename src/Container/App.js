import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher"></div>

            <div className="FormTitle">
              <NavLink
                to="/sign-in"
                activeClassName="FormTitle__Link--Active"
                className="FormTitle__Link"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/"
                activeClassName="FormTitle__Link--Active"
                className="FormTitle__Link"
              >
                Sign Up
              </NavLink>
            </div>

            <Route exact path="/" component={Register}></Route>
            <Route path="/sign-in" component={Login}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
