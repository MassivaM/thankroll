import React from "react";
import validate from "./ValidateInfo";
import useForm from "./UseForm";
import UploadPic from "./UploadPic";

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h1>
          Submit someone to be on Thankloop! Fill out this form and they'll be
          added to the loop. Please make sure you get their approval beforehand.
        </h1>
        <div className="form-inputs">
          <label className="form-label">First Name</label>
          <input
            className="form-input"
            type="text"
            name="firstname"
            placeholder="Their first name"
            value={values.firstname}
            onChange={handleChange}
          />
          {errors.firstname && <p>{errors.firstname}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Last Name</label>
          <input
            className="form-input"
            type="text"
            name="lastname"
            placeholder="Their last name"
            value={values.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="form-inputs">
          <label className="form-label">Profession</label>
          <input
            className="form-input"
            type="text"
            name="profession"
            placeholder="Their profession"
            value={values.profession}
            onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Their email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Why should they be on Thankloop?</label>
          <textarea
            className="text3"
            name="text"
            rows="4"
            cols="40"
            value={values.text}
            onChange={handleChange}
            placeholder="Enter a short description of them here"
          ></textarea>
          {errors.text && <p>{errors.text}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Upload a picture of them here</label>
          <UploadPic />
        </div>
        <button className="form-input-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSignup;
