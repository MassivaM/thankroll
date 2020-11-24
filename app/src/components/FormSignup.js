import React from "react";
import validate from "./ValidateInfo";
import useForm from "./UseForm";
import UploadPic from "./UploadPic";

const FormSignup = ({ submitForm }) => {
  const { handleChange, handleSubmit, handleCheck, values, errors } = useForm(
    submitForm,
    validate
  );
  console.log("checked" + values.accept);
  return (
    <div className="form-content-right">
      <form onSubmit={handleSubmit} className="form" noValidate>
        <h1 style={{ marginTop: 100, textAlign: "center" }}>
          Submit someone to be on Thankloop! Fill out this form and they'll be
          added to the loop.
        </h1>
        <div className="form-inputs">
          <label className="form-label">
            First Name <span style={{ color: "red" }}>*</span>{" "}
          </label>
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
          <label className="form-label">
            Profession <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <input
            className="form-input"
            type="text"
            name="profession"
            placeholder="Their profession"
            value={values.profession}
            onChange={handleChange}
          />
          {errors.profession && <p>{errors.profession}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">
            Email <span style={{ color: "red" }}>*</span>{" "}
          </label>
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
          <label className="form-label">
            Why should they be on Thankloop?{" "}
            <span style={{ color: "red" }}>*</span>
          </label>
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
          <label className="form-label">Upload a picture of them here </label>
          <UploadPic />
        </div>
        <div className="form-inputs">
          <input
            type="checkbox"
            id="accept"
            name="accept"
            checked={values.accept}
            onChange={handleChange}
          />
          <label
            for="accept"
            className="form-label"
            style={{ paddingLeft: 20 }}
          >
            I have gotten approval from this person to publish their picture,
            first name and story on Thankloop
            <span style={{ color: "red" }}>*</span>
          </label>
          {errors.accept && <p>{errors.accept}</p>}
        </div>
        <button className="form-input-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormSignup;
