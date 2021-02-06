import React, { Component } from "react";
import thankloop from "../assets/thankloop-white-logo.svg";
import rightarrow from "../assets/right-arrow.png";
import { withStyles } from "@material-ui/core/styles";
import "swiper/swiper-bundle.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Swiper, { Navigation, Pagination } from "swiper";
import fire from "../assets/fire.jpg";
import send from "../assets/send.png";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import Stats from "./Stats.js";
import Modal from "@material-ui/core/Modal";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);
const styles = (theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
});
// init Swiper:

class Swipper extends React.Component {
  constructor(props) {
    super(props);
    this.changeProfile = this.changeProfile.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchProfiles = this.fetchProfiles.bind(this);
    this.handleThank = this.handleThank.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      profiles: [
        {
          firstName: "",
          lastName: "",
          profession: "",
          image: "fire",
          description: "",
          email: "",
          _id: "",
        },
      ],
      name: "",
      firstName: "",
      profession: "",
      image: "fire.jpg",
      description: "",
      email: "",
      id: "",
      positionarray: [],
      visible: false,
      textValue: "",
      email: "",
      increment: 0,
    };
  }

  componentDidMount() {
    this.fetchProfiles();

    /*
    );*/
  }
  componentDidUpdate() {
    this.initalSetup(this.state.profiles);
  }
  initalSetup(profiles) {
    if (
      profiles !==
        [
          {
            firstName: "",
            lastName: "",
            profession: "",
            image: "fire.jpg",
            description: "",
            email: "",
          },
        ] &&
      this.state.increment == 0
    ) {
      var array = [];
      for (var i = 0; i < this.state.profiles.length; i++) {
        array.push(i);
      }
      array.sort(function (a, b) {
        return 0.5 - Math.random();
      });
      const fullName = `${profiles[array[0]].firstName} ${
        profiles[array[0]].lastName
      }`;
      this.setState({
        name: fullName,
        firstName: profiles[array[0]].firstName,
        profession: profiles[array[0]].profession,
        description: profiles[array[0]].description,
        image: profiles[array[0]].picture,
        id: profiles[array[0]]._id,
        positionarray: [...array],
        increment: 1,
      });
      console.log("id" + this.state.id);
    }
  }
  fetchProfiles() {
    const requestBody = {
      query: `
       query {
         profiles{
           _id
          firstName
          lastName
          description
          profession
          picture
        }
      }
      `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({ profiles: resData.data.profiles });
        console.log(this.state.profiles);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  changeProfile = () => {
    if (this.state.positionarray.length > 1) {
      this.state.positionarray.shift();

      const fullName = `${
        this.state.profiles[this.state.positionarray[0]].firstName
      } ${this.state.profiles[this.state.positionarray[0]].lastName}`;
      this.setState({
        name: fullName,
        firstName: this.state.profiles[this.state.positionarray[0]].firstName,
        profession: this.state.profiles[this.state.positionarray[0]].profession,
        description: this.state.profiles[this.state.positionarray[0]]
          .description,
        image: this.state.profiles[this.state.positionarray[0]].picture,
        id: this.state.profiles[this.state.positionarray[0]]._id,
        textValue: "",
        email: "",
        visible: false,
      });
    } else {
      var array = [];
      for (var i = 0; i < this.state.profiles.length; i++) {
        array.push(i);
      }
      array.sort(function (a, b) {
        return 0.5 - Math.random();
      });
      const fullName = `${this.state.profiles[array[0]].firstName} ${
        this.state.profiles[array[0]].lastName
      }`;
      this.setState({
        positionarray: [...array],
        name: fullName,
        firstName: this.state.profiles[array[0]].firstName,
        profession: this.state.profiles[array[0]].profession,
        description: this.state.profiles[array[0]].description,
        image: this.state.profiles[array[0]].picture,
        id: this.state.profiles[array[0]]._id,
        textValue: "",
        email: "",
        visible: false,
      });
    }
  };

  changeText(event) {
    this.setState({ textValue: event.target.value });
  }

  changeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const requestBody = {
      query: `
       mutation {
         thankProfile(profileId: "${this.state.id}" , message:"${this.state.textValue}"){
          _id
          createdAt 
          updatedAt
        }
      }
      `,
    };

    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log("res" + resData);
      })

      .catch((err) => {
        console.log(err);
      });
    this.setState({ textValue: "", email: "", visible: false });
  };
  handleThank() {
    this.setState({ visible: true });
  }
  handleClose() {
    this.setState({ visible: false });
  }
  render() {
    const { classes } = this.props;

    const body = (
      <div>
        <form className="thank-form" onSubmit={this.handleSubmit}>
          <p className="para">
            <span className="input">
              <input
                type="text"
                placeholder="Enter your email here if you'd like to be contacted"
                value={this.state.email}
                onChange={this.changeEmail}
                style={{
                  position: "absolute",
                  top: 10,
                  left: 100,
                  zIndex: 15,
                  width: 300,
                  fontSize: 13,
                  borderRadius: 0,
                }}
              ></input>
              <textarea
                className="text2"
                rows="4"
                cols="40"
                value={this.state.textValue}
                onChange={this.changeText}
                placeholder="Enter your message here, it'll go straight to their inbox"
              ></textarea>

              <span></span>
            </span>
          </p>
          <button
            type="submit"
            style={{
              position: "relative",
              marginLeft: "40em",
              top: -30,
              zIndex: 15,
            }}
          >
            <SendRoundedIcon style={{ color: "#70a1ff" }} />
          </button>
        </form>
      </div>
    );
    return (
      <div>
        <Stats />
        <div className="card">
          <div className="left">
            <div className="ava">
              <img src={this.state.image} />
            </div>
            <h1 className="name"> {this.state.name}</h1>

            <span className="status">{this.state.profession}</span>
          </div>
          <div className="right">
            <span className="descr">{this.state.description}</span>
            <button className="follow_btn" onClick={this.handleThank}>
              <span>Thank {this.state.firstName}</span>
            </button>
          </div>
          <Modal open={this.state.visible} onClose={this.handleClose}>
            {body}
          </Modal>
          <button className="next" onClick={this.changeProfile}>
            <img src={rightarrow} />
          </button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Swipper);
/**<div className={this.state.visible ? "fadeIn2" : "fadeOut2"}>
          
        </div> */
