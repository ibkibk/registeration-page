import React, { useState, useEffect } from "react";
import firebase, { db } from "../../firebase";
import { Button } from "semantic-ui-react";

const Logout = () => {
  const [names, setNames] = useState("");

  useEffect(() => {
    db.collection("names").onSnapshot((snapshot) => {
      console.log(snapshot.docs.map((doc) => doc.data().name));
      setNames(snapshot.docs.map((doc) => doc.data().name));
    });
  }, []);
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
      <p>{names}</p>
    </div>
  );
};

export default Logout;
