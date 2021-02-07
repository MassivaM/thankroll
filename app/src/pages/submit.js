import React, { useState } from "react";
import FormSignup from "../components/FormSignup";
import FormSuccess from "../components/FormSuccess";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <body className="form-container">
      <span className="close-btn">×</span>

      {!isSubmitted ? (
        <FormSignup submitForm={submitForm} />
      ) : (
        <div>
          <FormSuccess style={{ position: "absolute", zIndex: 10 }} />
        </div>
      )}
    </body>
  );
};

export default Form;
