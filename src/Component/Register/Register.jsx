import React, { useState } from "react";
import firebase, { providers, db } from "../../firebase";

const Register = (props) => {
  const [nameError, setNameError] = useState("");
  const [hasAgreedError, sethasAgreedError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confimPasswordError, setConfimPasswordError] = useState("");

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState(props.password || "");
  const [confimPassword, setConfimPassword] = useState(
    props.confimPassword || ""
  );

  const [hasAgreed, setHasAgreed] = useState(false);
  const [fireErrors, setFireErrors] = useState("");

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
    let hasAgreedError = false;
    let confimPasswordError = "";

    if (!name) {
      nameError = "Name required";
    }
    if (!email) {
      emailError = "Email required";
    }
    if (!password) {
      passwordError = "Password required";
    }
    if (!confimPassword) {
      confimPasswordError = "Confim your password";
    }
    if (confimPassword !== password) {
      confimPasswordError = "Password does not match";
    }

    if (!hasAgreed) {
      hasAgreedError = "Require agreement";
    }

    if (
      nameError ||
      hasAgreedError ||
      passwordError ||
      emailError ||
      confimPasswordError
    ) {
      setNameError(nameError);
      sethasAgreedError(hasAgreedError);
      setPasswordError(passwordError);
      setEmailError(emailError);
      setConfimPasswordError(confimPasswordError);

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
      password === confimPassword &&
      hasAgreed !== false
    ) {
      db.collection("users").add({
        email,
        password,
        name,
        hasAgreed,
        confimPassword,
      });
    }
  };
  // let errorNotification = fireErrors ? (
  //   <div className="Error"> {fireErrors} </div>
  // ) : null;

  return (
    <div className="FormCenter">
      {/* {errorNotification} */}
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
          <label className="FormField__Label" htmlFor="password">
            Confirm Your Password
          </label>
          <input
            type="password"
            id="Confimpassword"
            className="FormField__Input"
            placeholder="Confim your password"
            name="confimPassword"
            value={confimPassword}
            onChange={(e) => setConfimPassword(e.target.value)}
          />
          <div style={{ fontSize: 12, color: "red" }}>
            {confimPasswordError}
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
