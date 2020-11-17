import React, { Component } from "react";
import thankloop from "../assets/thankloop-white-logo.svg";
import rightarrow from "../assets/right-arrow.png";
import "swiper/swiper-bundle.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Swiper, { Navigation, Pagination } from "swiper";
import fire from "../assets/fire.jpg";
import profiles from "../assets/data/profiles/profiles.js";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);

// init Swiper:

export default class Swipper extends React.Component {
  state = {
    name: "",
    firstName: "",
    profession: "",
    image: "fire.jpg",
    description: "",
    email: "",
    positionarray: [],
    visible: false,
    textValue: "",
    email: "",
  };
  constructor(props) {
    super(props);
    this.changeProfile = this.changeProfile.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
  }

  componentDidMount() {
    var value = Math.random(profiles.length - 1);
    var position = Math.round(value);
    var array = [];
    for (var i = 0; i < profiles.length; i++) {
      array.push(i);
    }
    array.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    this.setState({
      name: profiles[array[0]].name,
      firstName: profiles[array[0]].firstName,
      profession: profiles[array[0]].profession,
      description: profiles[array[0]].description,
      image: profiles[array[0]].image,
      positionarray: [...array],
    });
  }

  changeProfile = () => {
    if (this.state.positionarray.length > 1) {
      this.state.positionarray.shift();

      this.setState({
        name: profiles[this.state.positionarray[0]].name,
        firstName: profiles[this.state.positionarray[0]].firstName,
        profession: profiles[this.state.positionarray[0]].profession,
        description: profiles[this.state.positionarray[0]].description,
        image: profiles[this.state.positionarray[0]].image,
      });
    } else {
      var array = [];
      for (var i = 0; i < profiles.length; i++) {
        array.push(i);
      }
      array.sort(function (a, b) {
        return 0.5 - Math.random();
      });

      this.setState({
        positionarray: [...array],
        name: profiles[array[0]].name,
        firstName: profiles[array[0]].firstName,
        profession: profiles[array[0]].profession,
        description: profiles[array[0]].description,
        image: profiles[array[0]].image,
      });
    }
  };

  changeText(event) {
    this.setState({ textValue: event.target.value });
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }
  render() {
    console.log(this.state.visible);
    return (
      <div>
        <div className="card">
          <div className="left">
            <div className="ava">
              <img src={require("../assets/" + this.state.image)} />
            </div>
            <h1 className="name"> {this.state.name}</h1>

            <span className="status">{this.state.profession}</span>
          </div>
          <div className="right">
            <span className="descr">{this.state.description}</span>
            <button
              className="follow_btn"
              onClick={() => {
                this.setState({ visible: !this.state.visible });
              }}
            >
              <img src={thankloop} alt="Place Holder" />
              <span>Thank {this.state.firstName}</span>
            </button>
          </div>
          <button className="next" onClick={this.changeProfile}>
            <img src={rightarrow} />
          </button>
        </div>
        <div
          className={this.state.visible ? "fadeIn2" : "fadeOut2"}
          style={{ marginTop: 300, marginLeft: 320 }}
        >
          <p className="para">
            <span className="input">
              <input
                type="text"
                placeholder="Enter your email if you'd like to be contacted"
                cols="40"
              ></input>
              <span></span>
            </span>
          </p>
          <p className="para">
            <span className="input">
              <textarea
                rows="4"
                cols="40"
                value={this.state.textValue}
                onChange={this.changeText}
                placeholder="Enter your message here it'll go straight to"
              ></textarea>
              <span></span>
            </span>
          </p>
        </div>
      </div>
    );
  }
}
