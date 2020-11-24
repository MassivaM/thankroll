export default function ValidateInfo(values) {
  let errors = {};

  if (!values.firstname.trim()) {
    errors.firstname = "First name required";
  }
  // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
  //   errors.name = 'Enter a valid name';
  // }
  if (!values.text.trim()) {
    errors.text = "Description required";
  }
  if (!values.accept) {
    errors.accept = "Must accept the Thankloop usage conditions";
  }
  if (!values.profession.trim()) {
    errors.profession = "Profession required";
  }

  if (!values.email) {
    errors.email = "Email required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }

  return errors;
}
