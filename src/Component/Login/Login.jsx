import React, { Component } from "react";
import firebase, { providers } from "../../firebase";

const initialState = {
  user: null,
  email: "",
  password: "",
  fireErrors: "",
};

class SignInForm extends Component {
  constructor() {
    super();

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  signIn = () => {
    firebase
      .auth()
      .signInWithPopup(providers.google)
      .then((result) => {
        this.setState({ user: result.user });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleSubmit(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        console.log(error);
        this.setState({ fireErrors: error.message });
      });
  }

  render() {
    const { password, email, fireErrors } = this.state;
    const { signIn, handleChange, handleSubmit } = this;

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
              onChange={handleChange}
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
              onChange={handleChange}
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
  }
}

export default SignInForm;
