import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import validate from "../components/ValidateInfo";
import useForm from "../components/UseForm";
import thankloop from "../assets/thankloop-white-logo.svg";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/authContext";
import TextField from "@material-ui/core/TextField";
import { useFormik } from "formik";
import { createHashHistory } from "history";
import * as yup from "yup";
const errors = useForm(validate);
export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }
  history = createHashHistory();
  validationSchema = yup.object({
    email: yup
      .string("Enter their email")
      .email("Enter a valid email")
      .required("Email is required"),
    firstName: yup
      .string("Enter their first name")
      .required("First name is required"),
    profession: yup
      .string("Enter their first name")
      .required("Profession is required"),
    description: yup
      .string("Enter their first name")
      .required("Description is required"),

    accept: yup.bool().oneOf([true], "Accept Terms & Conditions is required"),
  });
  static contextType = AuthContext;

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        query{ 
          login(email: "${email}", password: "${password}"){
            userId
            token
            tokenExpiration
          }
        }
      `,
    };
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
        this.history.push("/home");
      })

      .catch((err) => {
        console.log(err);
      });
  };
  /*responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };*/

  render() {
    return (
      <div className="form-content-right">
        <form
          className="login-form"
          onSubmit={this.submitHandler}
          noValidate
          style={{ width: "100%" }}
        >
          <div className="form-inputs2">
            <label htmlFor="email" className="form-label">
              Email <span style={{ color: "red" }}>*</span>{" "}
            </label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="Email"
              ref={this.emailEl}
            />
          </div>
          <div className="form-inputs2">
            <label className="form-label">
              Password
              <span style={{ color: "red" }}>*</span>
            </label>
            <input
              className="form-input"
              type="password"
              id="pass"
              name="password"
              placeholder="Password"
              minlength="8"
              required
              ref={this.passwordEl}
            ></input>
          </div>
          <NavLink to="/signup">
            <label className="form-label" style={{ color: "#0049B8" }}>
              Sign up
            </label>
          </NavLink>
          <br></br>
          <label className="form-label">Forgot password?</label>
          <button type="submit" className="login-btn">
            <img src={thankloop} alt="Place Holder" />
            <span>Login</span>
          </button>
        </form>

        <div></div>
      </div>
    );
  }
}
/*
 <GoogleLogin
              longTitle={true}
              //check git ignore
              clientId=""
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
       */
