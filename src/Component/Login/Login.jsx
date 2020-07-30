import React, { Component } from "react";
import firebase, { providers } from "../../firebase";

const initialState = {
  user: null,
  email: "",
  password: "",
  fireErrors: "",
  emailError: "",
  passwordError: "",
};

class SignInForm extends Component {
  constructor() {
    super();

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // validate = () => {
  //   let emailError = "";
  //   let passwordError = "";

  //   if (!this.state.password.length) {
  //     passwordError = "Password required";
  //   }

  //   if (!this.state.email.includes("@")) {
  //     emailError = "invalid email";
  //   }

  //   if (emailError || passwordError) {
  //     this.setState({ emailError, passwordError });
  //     return false;
  //   }

  //   return true;
  // };

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
    // const isValid = this.validate();
    // if (isValid) {
    //   console.log(this.state);
    //   this.setState(initialState);
    // } else {
    //   return false;
    // }
  }

  render() {
    let errorNotification = this.state.fireErrors ? (
      <div className="Error"> {this.state.fireErrors} </div>
    ) : null;
    return (
      <div className="FormCenter">
        {errorNotification}
        <form onSubmit={this.handleSubmit} className="FormFields">
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
              value={this.state.email}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.emailError}
            </div>
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
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.passwordError}
            </div>
          </div>

          <div className="FormField">
            <button onClick={this.handleSubmit} className="FormField__Button ">
              Sign In
            </button>{" "}
            <button onClick={this.signIn} to="/" className="FormField__Button ">
              Sign In with google
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignInForm;
