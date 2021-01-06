import React, { Component } from "react";
import GoogleLogin from "react-google-login";
import validate from "../components/ValidateInfo";
import useForm from "../components/UseForm";
import thankloop from "../assets/thankloop-white-logo.svg";
import { NavLink } from "react-router-dom";
const errors = useForm(validate);
export default class Signup extends Component {
  state = {
    isLogin: true,
  };

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
    this.firstNameEl = React.createRef();
    this.lastNameEl = React.createRef();
  }

  submitHandler = (event) => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    const firstName = this.firstNameEl.current.value;
    const lastName = "";
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    const requestBody = {
      query: `
        mutation {
          createUser(userinput: {email: "${email}", password: "${password}", firstName:"${firstName}", lastName: "Allo"}){
            _id
            email
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
        console.log(resData);
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
      <div>
        <div
          className="form-content-right"
          style={{ position: "absolute", left: "38%", top: "30%" }}
        >
          <form
            onSubmit={this.submitHandler}
            noValidate
            style={{ width: "100%" }}
          >
            <div className="form-inputs2">
              <label htmlFor="firstName" className="form-label">
                First Name <span style={{ color: "red" }}>*</span>{" "}
              </label>
              <input
                className="form-input"
                type="text"
                id="firstName"
                placeholder="First Name"
                ref={this.firstNameEl}
              />
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                className="form-input"
                type="text"
                id="firstName"
                placeholder="Last Name"
                ref={this.lasttNameEl}
              />
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
            <br></br>
            <NavLink to="/login">
              <label className="form-label">Already have an account?</label>
            </NavLink>
            <button type="submit" className="login-btn">
              <img src={thankloop} alt="Place Holder" />
              <span>Sign up</span>
            </button>
          </form>

          <div></div>
        </div>
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
