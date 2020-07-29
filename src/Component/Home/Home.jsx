// import React, { Component } from "react";
// import Login from "../Login/Login";
// import LoggedIn from "../Logout/LoggedIn";
// import firebase from "../../firebase";

// export default class Home extends Component {
//   state = {
//     user: null,
//   };

//   componentDidMount() {
//     this.authListener();
//   }

//   authListener() {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setState({ user });
//       } else {
//         this.setState({ user: null });
//       }
//     });
//   }

//   render() {
//     const { user } = this.state;
//     return <div>{this.state.user ? <LoggedIn /> : <Login />}</div>;
//   }
// }
