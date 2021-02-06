import React, { useState, useEffect } from "react";
import AuthContext from "../context/authContext";
import LoginForm from "./LoginForm";
import ReactDOM from "react-dom";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import useForm from "./UseForm";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
const validationSchema = yup.object({
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

  accept: yup.boolean().oneOf([true], "Accept Terms & Conditions is required"),
});

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    "& .MuiButton-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    paddingTop: 0,
  },
  rootblurred: {
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      disabled: true,
    },
    "& .MuiButton-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    "& .MuiFormControlLabel-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    filter: "blur(5px)",
    paddingTop: 0,
  },
});

class FormSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewSource: "",
      picture: "",
      isSubmitting: false,
      unprocessedPicture: "",
      pictureurl: "",
    };
  }
  static contextType = AuthContext;

  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.setState({ previewSource: reader.result });
    };
  };
  fileSelectedHandler = (event) => {
    const picture = event.target.files[0];
    this.setState({ picture: picture });
    this.previewFile(picture);

    //const value = event.target.files[0];
  };
  fileUploadHandler = () => {
    console.log("success");
  };

  uploadImage = async (picture) => {
    const file = picture;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cloud_name", "thankloop");
    formData.append("upload_preset", "xjijfup2");
    console.log("about to fetcg");
    let res = await fetch("https://api.cloudinary.com/v1_1/thankloop/upload/", {
      method: "post",
      mode: "cors",
      body: formData,
    });

    let json = await res.json();
    const url = JSON.stringify(json.secure_url);
    return url;
  };

  render() {
    const { classes } = this.props;

    return (
      <div style={{ padding: 0 }}>
        {!this.context.token && (
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
        <div className={classes.root}></div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            profession: "",
            description: "",
            picture: "",
            email: "",
            accept: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            values.picture = await this.uploadImage(this.state.picture);

            console.log(values.picture);
            /**
             *
             * Connexion to API
             *
             */

            const requestBody = {
              query: `
        mutation {
         createProfile(profileinput: {firstName: "${values.firstName}", lastName: "${values.lastName}", description: "${values.description}", profession: "${values.profession}", email: "${values.email}", picture: ${values.picture}, accept: ${values.accept}}),{
          _id
          firstName
          lastName
          description
          profession
          email
          accept 
          picture
          creator{
            _id
            email
          }
        }
      }
      `,
            };
            const token = this.context.token;
            fetch("http://localhost:4000/graphql", {
              method: "POST",
              body: JSON.stringify(requestBody),
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
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
                this.setState({ isSubmitting: true });
              })

              .catch((err) => {
                console.log(err);
              });
          }}
        >
          {(props) => (
            <form
              onSubmit={props.handleSubmit}
              className={
                this.context.token
                  ? `${classes.root}`
                  : `${classes.rootblurred}`
              }
            >
              <h1
                style={{
                  textAlign: "center",

                  fontSize: "1.4rem",

                  marginBottom: "1rem",
                  color: "#0049b8",
                }}
              >
                Make someone’s day by submitting them in the loop. (It’s free
                and anyone can do it)
              </h1>
              <TextField
                fullWidth
                id="firstName"
                name="firstName"
                label="First Name"
                disabled={this.context.token ? false : true}
                value={props.values.firstName}
                onChange={props.handleChange}
                variant="outlined"
                error={
                  props.touched.firstName && Boolean(props.errors.firstName)
                }
                helperText={props.touched.firstName && props.errors.firstName}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                disabled={this.context.token ? false : true}
                value={props.values.lastName}
                onChange={props.handleChange}
                helperText={props.touched.lastName}
              />
              <TextField
                fullWidth
                id="profession"
                name="profession"
                label="Profession"
                variant="outlined"
                disabled={this.context.token ? false : true}
                value={props.values.profession}
                onChange={props.handleChange}
                error={
                  props.touched.profession && Boolean(props.errors.profession)
                }
                helperText={props.touched.profession && props.errors.profession}
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Their email"
                variant="outlined"
                disabled={this.context.token ? false : true}
                value={props.values.email}
                onChange={props.handleChange}
                error={props.touched.email && Boolean(props.errors.email)}
                helperText={props.touched.email && props.errors.email}
              />
              <TextField
                fullWidth
                id="description"
                label="Enter a short description of them here"
                multiline
                rows={4}
                variant="outlined"
                disabled={this.context.token ? false : true}
                value={props.values.description}
                onChange={props.handleChange}
                error={
                  props.touched.description && Boolean(props.errors.description)
                }
                helperText={
                  props.touched.description && props.errors.description
                }
              />
              <Button
                variant="contained"
                disabled={this.context.token ? false : true}
                component="label"
              >
                Upload a picture of them
                <input
                  type="file"
                  onChange={this.fileSelectedHandler}
                  value={this.state.unprocessedPicture}
                  hidden
                />
              </Button>
              {this.state.previewSource && (
                <div>
                  <img
                    src={this.state.previewSource}
                    alt="chosen"
                    style={{ height: "200px" }}
                  />
                </div>
              )}
              <br></br>
              <FormControl required>
                <FormControlLabel
                  htmlFor="accept"
                  //disabled={this.context.token ? false : true}
                  value={props.values.accept}
                  control={
                    <Checkbox
                      color="primary"
                      name="accept"
                      id="accept"
                      onChange={props.handleChange}
                      style={{ margin: 10 }}
                      error={
                        props.touched.accept && Boolean(props.errors.accept)
                      }
                      helperText={props.touched.accept && props.errors.accept}
                    />
                  }
                  label="I have gotten approval from this person to publish their
                    picture, first name and story on Thankloop"
                  labelPlacement="end"
                />
              </FormControl>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                //disabled={this.context.token ? false : true}
                type="submit"
              >
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FormSignup);
/// <Button onClick={fileUploadHandler}>Upload</Button>
