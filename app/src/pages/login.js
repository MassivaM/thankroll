import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import validate from "../components/ValidateInfo";
import useForm from "../components/UseForm";
import thankloop from "../assets/thankloop-white-logo.svg";
import { Link } from "react-router-dom";
const errors = useForm(validate);
export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  constructor(props) {
    super(props);

    this.changePassword = this.changePassword.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  changeEmail(event) {
    this.setState({ email: event.target.value });
  }
  changePassword(event) {
    this.setState({ password: event.target.value });
  }
  handleSubmit(event) {
    this.setState({ password: "", email: "" });
    event.preventDefault();
  }
  responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  render() {
    return (
      <div>
        <div
          className="form-content-right"
          style={{ position: "absolute", left: "38%", top: "30%" }}
        >
          <form
            onSubmit={this.handleSubmit}
            noValidate
            style={{ width: "100%" }}
          >
            <div className="form-inputs2">
              <label className="form-label">
                Email <span style={{ color: "red" }}>*</span>{" "}
              </label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.changeEmail}
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
              ></input>
            </div>
            <Link to="/register">
              <label className="form-label" style={{ color: "#0049B8" }}>
                Sign up
              </label>
            </Link>
            <br></br>
            <label className="form-label">Forgot password?</label>
            <button type="submit" className="login-btn">
              <img src={thankloop} alt="Place Holder" />
              <span>Login</span>
            </button>
          </form>

          <div>
            <GoogleLogin
              longTitle={true}
              //check git ignore
              clientId="33938796980-dgbpq06p6p17ghsoi292befdcfca4ers.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    );
  }
}
/*

       */
