import React from "react";
import { mount } from "enzyme";
import Login from "./Login";

test("Login component should return correct output", () => {
  mount(
    <Login
      form={{ className: "FormFields" }}
      email={{
        placeholder: "Enter your email",
        className: "FormField__Input",
      }}
      password={{
        placeholder: "Enter your password",
        className: "FormField__Input",
      }}
      onSubmit={(email, password) => {
        console.log(email, password);
      }}
    />
  );
});
