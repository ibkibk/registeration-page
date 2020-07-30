import React, { useState, useEffect } from "react";
import firebase, { db } from "../../firebase";
import { Button } from "semantic-ui-react";

const Logout = () => {
  const [names, setNames] = useState("");
  // const [input, setInput] = useState("");
  const [users, setUsers] = useState("");

  useEffect(() => {
    db.collection("names").onSnapshot((snapshot) => {
      console.log(snapshot.docs.map((doc) => doc.data().name));
      setNames(snapshot.docs.map((doc) => doc.data().name));
    });
  }, []);
  const signOut = () => {
    firebase.auth().signOut();
  };

  const submit = (e) => {
    e.preventDefault();
    db.collection("users").add({
      names: users,
    });
    setUsers("");
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
        onClick={signOut}
      >
        Logout
      </Button>
      <h2>This message is coming from firebase database</h2>
      <p>{names}</p>
      <h2>
        The information you will enter will be stored in firebase database
      </h2>
      <input type="text" onChange={(e) => setUsers(e.target.value)} />
      <button onClick={(e) => submit(e)}>Add info</button>
    </div>
  );
};

export default Logout;
