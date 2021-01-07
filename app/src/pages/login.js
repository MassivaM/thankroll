import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import validate from "../components/ValidateInfo";
import useForm from "../components/UseForm";
import thankloop from "../assets/thankloop-white-logo.svg";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/authContext";
import LoginForm from "../components/LoginForm";
const errors = useForm(validate);

export default class Login extends Component {
  render() {
    return (
      <div className="form-content-right-login">
        <LoginForm />
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
