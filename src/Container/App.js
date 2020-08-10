import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";
import LoggedIn from "../Component/LoggedIn/LoggedIn";
import firebase from "../firebase";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const authListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };
  useEffect(() => {
    authListener();
  }, []);

  return (
    <Router>
      <div className="App">
        {user ? (
          <LoggedIn />
        ) : (
          <div>
            <Route path="/login" component={Login}></Route>
            <Route exact path="/" component={Register}></Route>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
