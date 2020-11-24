import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    profession: "",
    email: "",
    text: "",
    pictures: [],
    accept: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({
      ...values,
      [name]: value,
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
  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleCheck, handleSubmit, values, errors };
};

export default useForm;
