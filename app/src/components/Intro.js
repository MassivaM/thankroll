import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
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
      <AuthContext.Consumer>
        {(context) => {
          return (
            <body>
              {!context.token && (
                <div>
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
                              <p className="paragraph">
                                Did you thank someone today?
                              </p>

                              <p className="paragraph2">
                                Cultivate gratitude right here, right now by
                                thanking people that have had an impact on
                                communities and individuals.
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
                                    style={{
                                      border: "none",
                                      outline: 0,
                                      marginTop: 10,
                                    }}
                                    disabled={this.state.show ? "" : true}
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
                  <div
                    className={this.state.show ? "swippy blurred" : "swippy"}
                  >
                    <Swipper />
                  </div>
                </div>
              )}

              {context.token && (
                <div>
                  <div className="swippy">
                    <Swipper />
                  </div>
                </div>
              )}
            </body>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
