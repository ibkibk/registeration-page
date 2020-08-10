// import React, { Component } from "react";
// // import styles from "./router.module.scss";
// import { Router, Redirect, globalHistory } from "@reach/router";
// import Login from "../Component/Login/Login";
// import firebase, { providers } from "../firebase";
// import PrivateRoutes from "./PrivateRoutes";
// import LoggedIn from "../Component/LoggedIn/LoggedIn";

// // const NotFound = () => <h2>Oops, page not found</h2>;

// export default class Routes extends Component {
//   state = {
//     user: null,
//   };

//   signIn = () => {
//     firebase
//       .auth()
//       .signInWithPopup(providers.google)
//       .then((result) => {
//         this.setState({ user: result.user });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   signOut = () => {
//     firebase
//       .auth()
//       .signOut()
//       .then(() => {
//         this.setState({ user: null });
//         globalHistory.navigate("/login");
//       });
//   };

//   render() {
//     return (
//       <Router>
//         {/* <Login path="login" signIn={this.signIn} /> */}
//         <PrivateRoutes path="private" user={this.state.user}>
//           <LoggedIn
//             path="products"
//             user={this.state.user}
//             signOut={this.signOut}
//           />
//         </PrivateRoutes>
//       </Router>
//     );
//   }
// }
