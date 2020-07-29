import React, { Component } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
// import Home from "../Component/Home/Home";
import LoggedIn from "../Component/Logout/LoggedIn";
import firebase from "../firebase";

import "./App.css";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: null });
      }
    });
  }
  render() {
    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Aside"></div>
          {this.state.user ? (
            <LoggedIn />
          ) : (
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
          )}
        </div>
      </Router>
    );
  }
}

export default App;
