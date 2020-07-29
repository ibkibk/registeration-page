import React, { Component } from "react";
import firebase, { providers } from "../../firebase";

const initialState = {
  user: null,
  email: "",
  password: "",
  name: "",
  nameError: "",
  emailError: "",
  passwordError: "",
  hasAgreedError: false,
  hasAgreed: false,
};

class Register extends Component {
  constructor() {
    super();

    this.state = initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let hasAgreedError = false;

    if (!this.state.name) {
      nameError = "name cannot be blank";
    }

    if (!this.state.email.includes("@")) {
      emailError = "invalid email";
    }

    if (!this.state.password) {
      passwordError = "invalid password";
    }

    if (!this.state.hasAgreed) {
      hasAgreedError = "n";
    }

    if (emailError || nameError || passwordError || hasAgreedError) {
      this.setState({ emailError, nameError, passwordError, hasAgreedError });
      return false;
    }

    return true;
  };

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }
  signUp = () => {
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
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        this.setState({ fireErrors: error.message });
      });
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState(initialState);
    } else {
      return false;
    }
  }

  render() {
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField__Label" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="FormField__Input"
              placeholder="Enter your full name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>
              {this.state.nameError}
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
          </div>
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.emailError}
          </div>
          <div className="FormField">
            <label className="FormField__CheckboxLabel">
              <input
                className="FormField__Checkbox"
                type="checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.handleChange}
              />
              <div style={{ fontSize: 12, color: "red" }}>
                {this.state.hasAgreedError}
              </div>
              I agree all statements in{" "}
              <a href="" className="FormField__TermsLink">
                terms of service
              </a>
            </label>
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20">Sign Up</button>{" "}
            <button
              onClick={this.signUp}
              to="/sign-in"
              className="FormField__Button mr-20"
            >
              Sign up with Google
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
