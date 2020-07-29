import React from "react";
import firebase from "../../firebase";
// import style from "../LoggedIn/LoggedIn.mo";
import { Button } from "semantic-ui-react";

const Logout = () => {
  const signOut = () => {
    firebase.auth().signOut();
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1 style={{ color: "black" }}>Welcome!</h1>
      <Button
        style={{ width: "150px", height: "35px" }}
        primary
        // className={style.Button}
        onClick={signOut}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
