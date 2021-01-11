import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    profession: "",
    description: "",
    picture: "",
    email: "",
    accept: false,
  });
  const [errors, setErrors] = useState({});
  const [previewSource, setPreviewSource] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const firstName = target.firstName;
    const lastName = target.lastName;
    const profession = target.profession;
    const description = target.description;
    const email = target.email;

    setValues({
      ...values,
      [values.firstName]: target.firstName,
      [values.lastName]: target.lastName,
      [values.profession]: target.profession,
      [values.description]: target.description,
    });
  };
  const handleCheck = (e) => {
    if (e.checked) {
      setValues({
        [values.accept]: true,
      });
    } else {
      setValues({
        [values.accept]: false,
      });
    }
  };

  const fileSelectedHandler = (event) => {
    const picture = event.target.files[0];
    previewFile(picture);
    //const value = event.target.files[0];
    setValues({
      ...values,
      [picture]: picture,
    });
  };
  const fileUploadHandler = () => {
    console.log("success");
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const uploadImage = (base64EncodedImage) => {
    console.log(base64EncodedImage);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //const profile = { firstName, lastName, profession, description };

    setErrors(validate(values));
    uploadImage(previewSource);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return {
    handleChange,
    handleCheck,
    handleSubmit,
    fileSelectedHandler,
    fileUploadHandler,
    previewSource,
    values,
    errors,
  };
};

export default useForm;
