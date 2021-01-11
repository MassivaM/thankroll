import React from "react";
import AuthContext from "../context/authContext";
import LoginForm from "./LoginForm";
import ReactDOM from "react-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
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
const useStyles = makeStyles((theme) => ({
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
}));
const FormSignup = ({ submitForm }) => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      profession: "",
      description: "",
      picture: "",
      email: "",
      accept: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <AuthContext.Consumer>
      {(context) => {
        return (
          <div style={{ padding: 0 }}>
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
            <div className={classes.root}></div>
            <form
              onSubmit={formik.handleSubmit}
              className={
                context.token ? `${classes.root}` : `${classes.rootblurred}`
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
                disabled={context.token ? false : true}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                variant="outlined"
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
              />
              <TextField
                fullWidth
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                disabled={context.token ? false : true}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                helperText={formik.touched.lastName}
              />
              <TextField
                fullWidth
                id="profession"
                name="profession"
                label="Profession"
                variant="outlined"
                disabled={context.token ? false : true}
                value={formik.values.profession}
                onChange={formik.handleChange}
                error={
                  formik.touched.profession && Boolean(formik.errors.profession)
                }
                helperText={
                  formik.touched.profession && formik.errors.profession
                }
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Their email"
                variant="outlined"
                disabled={context.token ? false : true}
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                fullWidth
                id="description"
                label="Enter a short description of them here"
                multiline
                rows={4}
                variant="outlined"
                disabled={context.token ? false : true}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
              <Button
                variant="contained"
                disabled={context.token ? false : true}
                component="label"
              >
                Upload a picture of them
                <input type="file" hidden />
              </Button>
              <br></br>
              <FormControl required>
                <FormControlLabel
                  htmlFor="accept"
                  //disabled={context.token ? false : true}
                  value={formik.values.accept}
                  control={
                    <Checkbox
                      color="primary"
                      name="accept"
                      id="accept"
                      onChange={formik.handleChange}
                      style={{ margin: 10 }}
                      error={
                        formik.touched.accept && Boolean(formik.errors.accept)
                      }
                      helperText={formik.touched.accept && formik.errors.accept}
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
                //disabled={context.token ? false : true}
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
};

export default FormSignup;
/// <Button onClick={fileUploadHandler}>Upload</Button>
