import React, { useState } from "react";
import firebase, { providers } from "../../firebase";

const Login = (props) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fireErrors, setFireErrors] = useState("");

  const signIn = () => {
    firebase
      .auth()
      .signInWithPopup(providers.google)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setFireErrors(error.message);
      });
  };

  let errorNotification = fireErrors ? (
    <div className="Error"> {fireErrors} </div>
  ) : null;
  return (
    <div className="FormCenter">
      {errorNotification}
      <form onSubmit={handleSubmit} className="FormFields">
        <div className="FormField">
          <label className="FormField__Label" htmlFor="email">
            E-Mail Address
          </label>
          <input
            type="email"
            id="email"
            className="FormField__Input"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="FormField">
          <label className="FormField__Label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="FormField__Input"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="FormField">
          <button onClick={handleSubmit} className="FormField__Button ">
            Sign In
          </button>{" "}
          <button onClick={signIn} to="/" className="FormField__Button ">
            Sign In with google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
