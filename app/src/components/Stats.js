import React, { Component } from "react";
import meditation from "../assets/meditation.png";
import envelope from "../assets/envelope.png";
import clock from "../assets/clock.png";
export default class Stats extends React.Component {
  state = {
    pplThanked: 0,
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
/*<img
            className="reason1_image"
            src={envelope}
            style={{ width: 50, height: 50, marginLeft: 55 }}
          />*/
