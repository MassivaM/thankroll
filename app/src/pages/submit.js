import React, { Component } from "react";
import thankloop from "../assets/thankloop-white-logo.svg";
import rightarrow from "../assets/right-arrow.png";
import "swiper/swiper-bundle.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Swiper, { Navigation, Pagination } from "swiper";
import fire from "../assets/fire.jpg";
import { useForm } from "react-hook-form";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// init Swiper:

export default function Submit() {
  {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="First name"
          name="First name"
          ref={register({ required: true, maxLength: 80 })}
        />
        <input
          type="text"
          placeholder="Last name"
          name="Last name"
          ref={register({ required: true, maxLength: 100 })}
        />
        <input
          type="text"
          placeholder="Email"
          name="Email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="text"
          placeholder="Profession"
          name="Profession"
          ref={register({ required: true })}
        />

        <input type="submit" />
      </form>
    );
  }
}
