import React, { useState } from "react";
import firebase, { providers, db } from "../../firebase";

const Register = () => {
  const [nameError, setNameError] = useState("");
  const [hasAgreedError, sethasAgreedError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [hasAgreed, setHasAgreed] = useState(false);
  const [fireErrors, setFireErrors] = useState("");

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let hasAgreedError = false;

    if (!name) {
      nameError = "Name Required";
    }
    if (!email) {
      emailError = "Email Required";
    }
    if (!password) {
      passwordError = "Password Required";
    }
    if (!hasAgreed) {
      hasAgreedError = "require agreement";
    }

    if (nameError || hasAgreedError || passwordError || emailError) {
      setNameError(nameError);
      sethasAgreedError(hasAgreedError);
      setPasswordError(passwordError);
      setEmailError(emailError);

      return false;
    }

    return true;
  };

  const signUp = () => {
    firebase
      .auth()
      .signInWithPopup(providers.google)
      .then((result) => {
        setUser({ user: result.user });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setHasAgreed(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      console.log("it is working");
      // setErrors("");
    } else {
      console.log("Not working!");
      return false;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
        setFireErrors(error.message);
      });

    if (
      email !== "" &&
      name !== "" &&
      password.length >= 6 &&
      hasAgreed !== false
    ) {
      db.collection("users").add({
        email,
        password,
        name,
        hasAgreed,
      });
    }
  };
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
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ fontSize: 12, color: "red" }}>{passwordError}</div>
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{ fontSize: 12, color: "red" }}>{emailError}</div>
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
            onClick={(e) => signUp(e)}
            to="/sign-in"
            className="FormField__Button mr-20"
          >
            Sign up with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
