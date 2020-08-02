import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import LoggedIn from "../Component/LoggedIn/LoggedIn";
import firebase from "../firebase";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    authListener();
  }, []);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };

  return (
    <Router>
      <div className="App">
        {user ? (
          <LoggedIn />
        ) : (
          <div className="App__Added">
            <div className="App__Form">
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
        )}
      </div>
    </Router>
  );
};

export default App;
