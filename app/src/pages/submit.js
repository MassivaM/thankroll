import React, { useState } from "react";
import FormSignup from "../components/FormSignup";
import FormSuccess from "../components/FormSuccess";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  function showForm() {
    setIsSubmitted(false);
  }

  return (
    <body className="form-container">
      <span className="close-btn">×</span>

      {!isSubmitted ? (
        <FormSignup SendSuccess={submitForm} />
      ) : (
        <div>
          <FormSuccess
            style={{ position: "absolute", zIndex: 10 }}
            BackToSubmit={showForm}
          />
        </div>
      )}
    </body>
  );
};

export default Form;
