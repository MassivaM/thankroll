import React from "react";
import validate from "./ValidateInfo";
import useForm from "./UseForm";
import UploadPic from "./UploadPic";
import AuthContext from "../context/authContext";
import { NavLink } from "react-router-dom";
import LoginForm from "./LoginForm";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
const FormSignup = ({ submitForm }) => {
  const {
    handleChange,
    handleSubmit,
    fileSelectedHandler,
    handleCheck,
    previewSource,
    fileUploadHandler,
    values,
    errors,
  } = useForm(submitForm, validate);
  console.log("checked" + values.accept);

  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div>
            {!context.token && (
              <div className="login-submit">
                <h1
                  style={{
                    fontSize: "2.7vh",
                    fontFamily: "Baloo 2",
                    fontWeight: 600,
                    color: "#0049b8",
                    paddingLeft: "1.8vh",
                  }}
                >
                  Please login to submit someone
                </h1>
                <LoginForm />
              </div>
            )}
            <div className="form-content-right">
              <form
                onSubmit={handleSubmit}
                className={context.token ? "form" : "form blurred3 "}
              >
                <h1 style={{ textAlign: "center", fontSize: "2.3vh" }}>
                  Make someone’s day by submitting them in the loop. (It’s free
                  and anyone can do it)
                </h1>
                <div className="form-inputs">
                  <label className="form-label">
                    First Name <span style={{ color: "red" }}>*</span>{" "}
                  </label>
                  <input
                    className="form-input"
                    type="text"
                    name="firstName"
                    placeholder="Their first name"
                    value={values.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstname && <p>{errors.firstname}</p>}
                </div>
                <div className="form-inputs">
                  <label className="form-label">Last Name</label>
                  <input
                    className="form-input"
                    type="text"
                    name="lastName"
                    placeholder="Their last name"
                    value={values.lastName}
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
                    className="text4"
                    name="description"
                    rows="4"
                    cols="40"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Enter a short description of them here"
                  ></textarea>
                  {errors.text && <p>{errors.text}</p>}
                </div>
                <div className="form-inputs">
                  <label className="form-label">
                    Upload a picture of them here{" "}
                  </label>
                  <input
                    type="file"
                    onChange={fileSelectedHandler}
                    value={values.picture}
                    name="picture"
                    className="input-file"
                  />

                  {previewSource && (
                    <div>
                      <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: "200px" }}
                      />
                    </div>
                  )}
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
                    I have gotten approval from this person to publish their
                    picture, first name and story on Thankloop
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {errors.accept && <p>{errors.accept}</p>}
                </div>
                <button className="form-input-btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default FormSignup;
/// <Button onClick={fileUploadHandler}>Upload</Button>