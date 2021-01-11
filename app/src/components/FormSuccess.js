import React from "react";
import logo from "../assets/thankloop-logo-2.svg";
const FormSuccess = () => {
  return (
    <div className="checkmark">
      <h1 className="successtext" style={{ textAlign: "center", fontSize: 70 }}>
        They're in the loop!
      </h1>
      <p style={{ marginTop: 30, fontWeight: 400 }}>
        Thanks for contributing, they will soon receive a personalized email{" "}
        <br></br>
        where we've gathered all of their thank you messages
      </p>
      <img src={logo} style={{ width: 70, height: 70, marginTop: 30 }} />
    </div>
  );
};

export default FormSuccess;
