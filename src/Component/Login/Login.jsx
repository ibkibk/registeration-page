import React, { useState } from "react";
import firebase, { providers } from "../../firebase";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

const Login = (props) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(props.email || "");
  const [password, setPassword] = useState(props.password || "");
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
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      {" "}
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account{" "}
        </Header>
        {errorNotification}

        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
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
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              id="password"
              className="FormField__Input"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              color="teal"
              fluid
              size="large"
              type="button"
              onClick={handleSubmit}
            >
              Sign In
            </Button>{" "}
            <hr />
            <Button
              color="teal"
              fluid
              size="large"
              type="button"
              onClick={signIn}
              to="/"
            >
              Sign In with google
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <a href="#">Sign Up</a>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Login;

//   <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
//     <Grid.Column style={{ maxWidth: 450 }}>
//       <Header as="h2" color="teal" textAlign="center">
//         Log-in to your account
//       </Header>
//       <Form size="large">
//         <Segment stacked>
//           <Form.Input
//             fluid
//             icon="user"
//             iconPosition="left"
//             placeholder="E-mail address"
//           />
//           <Form.Input
//             fluid
//             icon="lock"
//             iconPosition="left"
//             placeholder="Password"
//             type="password"
//           />

//           <Button color="teal" fluid size="large">
//             Login
//           </Button>
//         </Segment>
//       </Form>
//       <Message>
//         New to us? <a href="#">Sign Up</a>
//       </Message>
//     </Grid.Column>
//   </Grid>
// );

// export default LoginForm;
