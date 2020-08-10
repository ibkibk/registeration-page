import React, { useState, useEffect } from "react";
import firebase, { db } from "../../firebase";
import { Button } from "semantic-ui-react";
import { Dropdown, Menu } from "semantic-ui-react";

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
      <Menu vertical>
        <Dropdown item text="Home">
          <Dropdown.Menu>
            <Dropdown.Item>About</Dropdown.Item>
            <Dropdown.Item>Career</Dropdown.Item>
            <Dropdown.Item>Contact</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
      <Button
        style={{ width: "150px", height: "35px" }}
        color="teal"
        onClick={signOut}
      >
        Logout
      </Button>
      <h1 style={{ color: "black" }}>Welcome!</h1>

      <h2>You have succesfully logged in</h2>
      <p>{names}</p>
    </div>
  );
};

export default Logout;
