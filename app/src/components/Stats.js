import React, { Component } from "react";
import AuthContext from "../context/authContext";
import { NavLink } from "react-router-dom";
export default class Stats extends React.Component {
  state = {
    pplThanked: 0,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AuthContext.Consumer>
        {(context) => {
          return (
            <div>
              {context.token && (
                <div className="pplthanked">
                  <div className="reason1_text">
                    <p className="pplthanked_text">
                      <span style={{ fontStyle: "normal" }}>
                        {this.state.pplThanked}
                      </span>{" "}
                      people thanked
                    </p>
                  </div>
                </div>
              )}
              {!context.token && (
                <div className="pplthanked">
                  <div className="reason1_text">
                    <p className="pplthanked_text">
                      <NavLink to="/login"> Login </NavLink> to track your
                      thanking progress
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        }}
      </AuthContext.Consumer>
    );
  }
}
/*<img
            className="reason1_image"
            src={envelope}
            style={{ width: 50, height: 50, marginLeft: 55 }}
          />*/
