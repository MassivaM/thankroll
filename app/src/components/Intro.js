import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/thankloop-logo-2.svg";
import heart from "../assets/heart.svg";
import nurse from "../assets/nurse.jpg";
import cook from "../assets/cook.jpg";
import construction from "../assets/construction.jpg";
import fire from "../assets/fire.jpg";
import researcher from "../assets/researcher.jpg";
import teacher from "../assets/teacher.jpg";
import artist from "../assets/artist.jpg";
import present from "../assets/present.jpg";
import quote1 from "../assets/quote1.png";
import quote2 from "../assets/quote2.png";
import quote3 from "../assets/quote3.png";
import quote4 from "../assets/quote4.png";
import Swipper from "../components/Swipper.js";
export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
    };
  }

  render() {
    let i;
    return (
      <body>
        <div className={this.state.show ? "fadeIn" : "fadeOut"}>
          <div className="container">
            <div className="row">
              <div className="colum">
                <div className="box-loading">
                  <div className="cirlce-wave"></div>
                  <div className="cirlce-wave--2"></div>
                  <div className="cirlce-wave--3"></div>
                  <div className="cirlce-wave--4"></div>
                  <div className="cirlce-wave--5"></div>

                  <div className="text">
                    <p className="paragraph">Did you thank someone today?</p>

                    <p className="paragraph2">
                      Cultivate gratitude right here, right now by thanking
                      professionals around the world.
                    </p>

                    <div className="btn">
                      <button
                        className="logo"
                        data-wipe="Get thanking"
                        style={{ border: "none", outline: 0 }}
                        onClick={() => {
                          this.setState({ show: !this.state.show });
                        }}
                        visible={this.state.show}
                      >
                        Get thanking
                      </button>
                      <Link to="/submit">
                        <button
                          className="logo2"
                          data-wipe="Submit someone"
                          style={{ border: "none", outline: 0, marginTop: 10 }}
                          disabled={this.state.show ? "" : "true"}
                        >
                          Submit someone
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={this.state.show ? "swippy blurred" : "swippy"}>
          <Swipper />
        </div>
      </body>
    );
  }
}

/*
 <div className="wrapper fadeIn2">
            <svg className="svg-visible">
              <image href={quote1} width="259px" height="36px" />
            </svg>
          </div>
          <div className="wrapper wrapper2 fadeIn2">
            <svg className="svg-visible">
              <image href={quote1} width="259px" height="36px" />
            </svg>
          </div>

          <div className="wrapper wrapper3 fadeIn2">
            <svg className="svg-visible">
              <image href={quote1} width="259px" height="36px" />
            </svg>
          </div>

          <div className="wrapper wrapper4 fadeIn2">
            <svg className="svg-visible">
              <image href={quote1} width="259px" height="36px" />
            </svg>
          </div>
          <div className="wrapper wrapper5 fadeIn2">
            <svg className="svg-visible">
              <image href={quote1} width="259px" height="36px" />
            </svg>
          </div>

          <div className="wrapper wrapper6 fadeIn2">
            <svg className="svg-visible">
              <image href={quote1} width="259px" height="36px" />
            </svg>
          </div>

          <div className="wrapper wrapper7 fadeIn2">
            <svg className="svg-visible">
              <image href={quote1} width="259px" height="36px" />
            </svg>
          </div>
          <div className="wrapper wrapper8 fadeIn2">
            <svg className="svg-visible">
              <image href={quote1} width="259px" height="36px" />
            </svg>
          </div>
 */
