import React, { Component } from "react";
import thankloop from "../assets/thankloop-white-logo.svg";
import rightarrow from "../assets/right-arrow.png";
import "swiper/swiper-bundle.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Swiper, { Navigation, Pagination } from "swiper";
import fire from "../assets/fire.jpg";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// init Swiper:

export default class Submit extends Component {
  render() {
    return (
      <div>
        <div className="welcome">
          <div className="Rectangle">
            <div className="Rectangle2">
              <h1>It's about more than just saying thanks.</h1>
            </div>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 365.38"
            style={{
              width: "100%",
              height: "auto",
              top: 450,
              margin: 0,
              left: 0,
            }}
          >
            <path
              fill="#6C5CE7"
              fill-opacity="1"
              d="M0,160L26.7,170.7C53.3,181,107,203,160,224C213.3,245,267,267,320,266.7C373.3,267,427,245,480,218.7C533.3,192,587,160,640,165.3C693.3,171,747,213,800,202.7C853.3,192,907,128,960,122.7C1013.3,117,1067,171,1120,213.3C1173.3,256,1227,288,1280,288C1333.3,288,1387,256,1413,240L1440,224L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }
}
