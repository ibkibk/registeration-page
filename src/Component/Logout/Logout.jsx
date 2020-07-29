import React from "react";
// import firebase from "../../../firebase";
// import style from "../LoggedIn/LoggedIn.module.scss";
import { Button } from "semantic-ui-react";

const Logout = () => {
  //   const signOut = () => {
  //     firebase.auth().signOut();
  //   };

  return (
    <div className={style.Wrapper}>
      <h1 className={style.Header}>Welcome!</h1>
      <Button
        style={{ width: "150px", height: "35px" }}
        primary
        className={style.Button}
        onClick={signOut}
      >
        Logout
      </Button>
    </div>
  );
};

export default Logout;
