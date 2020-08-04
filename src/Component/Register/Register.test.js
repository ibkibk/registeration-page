import React from "react";
import { shallow } from "enzyme";
import Register from "./Register";

describe("<Register /> with other props", () => {
  const initialProps = {
    email: "acesmndr@gmail.com",
    password: "notapassword",
    confimPassword: "notapassword",
  };
  const container = shallow(<Register {...initialProps} />);

  it("should have proper props for email field", () => {
    expect(container.find('input[type="email"]').props()).toEqual({
      type: "email",
      id: "email",
      className: "FormField__Input",
      placeholder: "Enter your email",
      name: "email",
      value: "acesmndr@gmail.com",
      onChange: expect.any(Function),
    });
  });

  it("should have proper props for password field", () => {
    expect(container.find('input[type="password"]').props()).toEqual({
      type: "password",
      id: "password",
      className: "FormField__Input",
      placeholder: "Enter your password",
      name: "password",
      value: "notapassword",
      onChange: expect.any(Function),
    });
  });
  it("should have proper props for password field", () => {
    expect(container.find('input[type="ppassword"]').props()).toEqual({
      type: "ppassword",
      id: "Confimpassword",
      className: "FormField__Input",
      placeholder: "Confim your password",
      name: "confimPassword",
      value: "notapassword",
      onChange: expect.any(Function),
    });
  });
});
