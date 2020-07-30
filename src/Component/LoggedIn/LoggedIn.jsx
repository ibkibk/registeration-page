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
      <h1 style={{ color: "white" }}>Welcome!</h1>
      <Button
        style={{ width: "150px", height: "35px" }}
        primary
        onClick={signOut}
      >
        Logout
      </Button>
      <h2>This message is coming from firebase database</h2>
      <p>{names}</p>
    </div>
  );
};

export default Logout;
