import React, { Component } from "react";
import thankloop from "../assets/thankloop-white-logo.svg";
import rightarrow from "../assets/right-arrow.png";
import "swiper/swiper-bundle.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Swiper, { Navigation, Pagination } from "swiper";
import AOS from "aos";
import "aos/dist/aos.css";
import pin from "../assets/thankloop pin.png";
import fire from "../assets/fire.jpg";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// init Swiper:

export default function Benefit() {
  AOS.init({
    duration: 1500,
  });

  return (
    <div>
      <div>
        <div data-aos="fade-down" className="Rectangle">
          <div className="Rectangle2">
            <h1>It's about more than just saying thanks.</h1>
          </div>
        </div>
      </div>
      <div className="reasons">
        <h1 data-aos="fade-down" data-aos-offset="100" className="about">
          It's about ...
        </h1>

        <div className="reason1" data-aos="fade-right">
          <img
            className="reason1_image"
            src={pin}
            style={{ width: 125, height: 125 }}
          />
          <div className="reason1_text">
            <h1 style={{ fontSize: 20 }}>Improving your mental health</h1>

            <br></br>
            <p style={{ fontSize: "1vw" }}>
              People who practice gratitude experience less toxic emotions,
              <br></br>
              ranging from envy and resentment to frustration and regret.
            </p>
            <a
              className="links"
              href="https://www.health.harvard.edu/healthbeat/giving-thanks-can-make-you-happier"
            >
              Read More ...
            </a>
          </div>
        </div>
        <div
          className="reason1"
          data-aos="fade-down"
          style={{ paddingLeft: "30em", paddingTop: "0px" }}
        >
          <img
            className="reason1_image"
            src={pin}
            style={{ width: 125, height: 125 }}
          />
          <div className="reason1_text">
            <h1 style={{ fontSize: 20 }}>Connecting with others</h1>
            <br></br>
            <p style={{ fontSize: "1vw" }}>
              Gratitude helps people connect to something larger than themselves
              as individuals
            </p>
            <a
              className="links"
              href="https://www.health.harvard.edu/healthbeat/giving-thanks-can-make-you-happier"
            >
              Read More ...
            </a>
          </div>
        </div>
        <div
          className="reason1"
          data-aos="fade-left"
          style={{ paddingLeft: "50em", paddingTop: "0px" }}
        >
          <img
            className="reason1_image"
            src={pin}
            style={{ width: 125, height: 125 }}
          />
          <div className="reason1_text">
            <h1 style={{ fontSize: 20 }}>Improving your physical health</h1>
            <br></br>
            <p style={{ fontSize: "1vw" }}>
              Grateful people are also more likely to take care of their health.
              <br></br>
              They exercise more often and are more likely to attend regular
              <br></br>
              check-ups with their doctors, which is likely to contribute to
              <br></br>
              further longevity.
            </p>
            <a
              className="links"
              href="https://positivepsychology.com/benefits-gratitude-research-questions/"
            >
              Read More ...
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
/*<div
        style={{
          width: "100%",
          display: "block",
          height: 10,
          padding: 0,
          margin: 0,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 269"
          className="svg-purple"
          style={{}}
        >
          <path
            fill="#6C5CE7"
            fill-opacity="1"
            d="M0,160L40,181.3C80,203,160,245,240,229.3C320,213,400,139,480,117.3C560,96,640,128,720,165.3C800,203,880,245,960,256C1040,267,1120,245,1200,234.7C1280,224,1360,224,1400,224L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
          ></path>
        </svg>
      </div>*/
