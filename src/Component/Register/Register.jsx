import React, { Component } from "react";
import firebase, { providers, db } from "../../firebase";

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
    let hasAgreedError = false;

    if (!this.state.name) {
      nameError = "Name Required";
    }

    if (!this.state.hasAgreed) {
      hasAgreedError = "Required";
    }

    if (nameError || hasAgreedError) {
      this.setState({ nameError, hasAgreedError });
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
      users: e.target.value,
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
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      this.setState({ initialState });
    } else {
      return false;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) => {
        this.setState({ fireErrors: error.message });
      });

    if (this.state.user !== "") {
      db.collection("users").add({
        user: this.state.name,
      });
      this.setState({ user: this.state.name });
    }
  }

  render() {
    const {
      name,
      password,
      email,
      hasAgreed,
      hasAgreedError,
      fireErrors,
      nameError,
    } = this.state;
    const { signUp, handleChange, handleSubmit } = this;
    let errorNotification = fireErrors ? (
      <div className="Error"> {fireErrors} </div>
    ) : null;
    return (
      <div className="FormCenter">
        {errorNotification}
        <form onSubmit={handleSubmit} className="FormFields">
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
              value={name}
              onChange={handleChange}
            />
            <div style={{ fontSize: 12, color: "red" }}>{nameError}</div>
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
            <label className="FormField__CheckboxLabel">
              <input
                className="FormField__Checkbox"
                type="checkbox"
                name="hasAgreed"
                value={hasAgreed}
                onChange={handleChange}
              />
              I agree all statements in{" "}
              <a href="" className="FormField__TermsLink">
                terms of service
              </a>
              <div style={{ fontSize: 12, color: "red" }}>{hasAgreedError}</div>
            </label>
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20">Sign Up</button>{" "}
            <button
              onClick={signUp}
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
