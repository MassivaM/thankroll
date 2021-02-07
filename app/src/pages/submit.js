import React, { useState } from "react";
import FormSignup from "../components/FormSignup";
import FormSuccess from "../components/FormSuccess";

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className="form-container" style={{ paddingTop: 300 }}>
        <span className="close-btn">×</span>

        {!isSubmitted ? (
          <FormSignup submitForm={submitForm} />
        ) : (
          <div>
            <FormSuccess style={{ position: "absolute", zIndex: 10 }} />
          </div>
        )}
      </div>
    </>
  );
};

export default Form;
