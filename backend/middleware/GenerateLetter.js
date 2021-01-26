const { profiles } = require("../graphql/resolvers/merge");

module.exports = {
  GenerateLetter: async (args) => {
  
    console.log(args + ' ' + profiles);
  
    /*if (!values.firstName.trim()) {
      errors.firstName = "First name required";
    }
    // else if (!/^[A-Za-z]+/.test(values.name.trim())) {
    //   errors.name = 'Enter a valid name';
    // }
    if (!values.description.trim()) {
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
  
    return errors;*/
  }
}