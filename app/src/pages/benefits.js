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
              <h1>Why bother thanking?</h1>
            </div>
          </div>

          <p className="article">
            We’re on a mission to have people thank each other more often, but
            that’s not just because we want a kinder world: there are{" "}
            <span style={{ fontWeight: 700, color: "#6c5ce7" }}>
              {" "}
              scientifically proven benefits to thanking and gratitude, for
              others and for you as well.{" "}
            </span>
            <br></br>
            <br></br>
            For years, research has shown gratitude not only reduces stress, but
            it may also play a major role in overcoming trauma.  Gratitude
            reduces a multitude of toxic emotions, ranging from envy and
            resentment to frustration and regret. It effectively increases
            happiness and reduces depression (Robert Emmonds). In addition, a
            2006 study published in Behavior Research and Therapy found that
            Vietnam War Veterans with higher levels of gratitude experienced
            lower rates of Post-Traumatic Stress Disorder.  
            <br></br>
            <br></br>
            So, when you go and thank people on this website, you create a key
            moment of happiness for the other person, but for you as well.
            <br></br>
            <br></br>
            We rely entirely on donations; if you want to help us keep this site
            alive, click on the donation below.
          </p>
        </div>
      </div>
    );
  }
}
