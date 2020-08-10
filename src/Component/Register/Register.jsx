import React, { useState } from "react";
import firebase, { providers, db } from "../../firebase";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const Register = () => {
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confimPasswordError, setConfimPasswordError] = useState("");

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";
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
    if (confimPassword !== "" && confimPassword !== password) {
      confimPasswordError = "Password does not match";
    }

    if (nameError || passwordError || emailError || confimPasswordError) {
      setNameError(nameError);
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
        setUser(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      console.log("it is working");
      //       // setErrors("");
    } else {
      console.log("Not working!");
      return false;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        console.log(error);
      });

    if (
      email !== "" &&
      name !== "" &&
      password.length >= 6 &&
      password === confimPassword
    ) {
      db.collection("users").add({
        email,
        password,
        name,
        confimPassword,
      });
    }
  };

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      {" "}
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Create an account{" "}
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              icon="user"
              iconPosition="left"
              type="text"
              id="name"
              placeholder="Enter your full name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <Header as="h5" color="red">
              {nameError}
            </Header> */}
            <div style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>
              {nameError}
            </div>
            <Form.Input
              icon="user"
              iconPosition="left"
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>
              {emailError}
            </div>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>
              {passwordError}
            </div>
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              type="password"
              id="ConfimPassword"
              placeholder="Confim your password"
              name="confimPassword"
              value={confimPassword}
              onChange={(e) => setConfimPassword(e.target.value)}
            />
            <div style={{ fontSize: 12, color: "red", fontWeight: "bold" }}>
              {confimPasswordError}
            </div>
            <Button
              onClick={(e) => handleSubmit(e)}
              color="teal"
              fluid
              size="large"
              type="button"
            >
              Sign Up
            </Button>{" "}
            <hr />
            <Button
              color="teal"
              fluid
              size="large"
              type="button"
              onClick={(e) => signUp(e)}
              to="/login"
            >
              Sign up with Google
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account?{" "}
          <a href="#/login" to="#/login">
            Login
          </a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
