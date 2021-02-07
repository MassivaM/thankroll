import React, { Component } from "react";
import thankloop from "../assets/thankloop-logo.png";
import rightarrow from "../assets/right-arrow.png";
import { withStyles } from "@material-ui/core/styles";
import "swiper/swiper-bundle.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Swiper, { Navigation, Pagination } from "swiper";
import TextField from "@material-ui/core/TextField";
import fire from "../assets/fire.jpg";
import send from "../assets/send.png";
import AuthContext from "../context/authContext";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import Stats from "./Stats.js";
import Modal from "@material-ui/core/Modal";
import { NavLink } from "react-router-dom";
// configure Swiper to use modules
Swiper.use([Navigation, Pagination]);
const styles = (theme) => ({
  root: {
    background: "white",
    margin: 5,
    "& .MuiTextField-root": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(10),
      marginRight: theme.spacing(2),
    },

    paddingTop: 0,
  },
  resize: {
    fontSize: 12,
  },
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
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.changeProfile = this.changeProfile.bind(this);
    this.changeText = this.changeText.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changeName = this.changeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchProfiles = this.fetchProfiles.bind(this);
    this.handleThank = this.handleThank.bind(this);
    this.handleCloseThank = this.handleCloseThank.bind(this);
    this.handleCloseSuccess = this.handleCloseSuccess.bind(this);
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
      contactEmail: null,
      contactName: null,
      increment: 0,
      success: false,
      endOfLoop: false,
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
    } else if (this.state.endOfLoop == false) {
      this.setState({
        endOfLoop: true,
        name: "",

        profession: "",
        description:
          "You've reached the end of the loop! Click below to submit someone and keep it going or click on the arrow to view profiles again",
        image:
          "https://res.cloudinary.com/thankloop/image/upload/v1612655964/Email/thankloop-logo_zrtor4.png",
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
        endOfLoop: false,
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
    this.setState({ contactEmail: event.target.value });
  }
  changeName(event) {
    this.setState({ contactName: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      query: `
       mutation {
         thankProfile(profileId: "${this.state.id}" , message:"${this.state.textValue}", contactName: "${this.state.contactName}" , contactEmail: "${this.state.contactEmail}"){
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
        this.setState({ success: true });
      })

      .catch((err) => {
        console.log(err);
      });
    this.setState({ textValue: "", email: "", visible: false });
  };

  handleSubmitLoggedIn = (event) => {
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
    const token = this.context.token;
    fetch("http://localhost:4000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
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
        this.setState({ success: true });
      })

      .catch((err) => {
        console.log(err);
      });
    this.setState({ textValue: "", email: "", visible: false });
  };
  handleThank() {
    this.setState({ visible: true });
  }
  handleCloseThank() {
    this.setState({ visible: false });
  }
  handleCloseSuccess() {
    this.setState({ success: false });
  }
  render() {
    const { classes } = this.props;

    const body = (
      <div>
        <form className="thank-form" onSubmit={this.handleSubmit}>
          <p className="para">
            <span className="input">
              <TextField
                className={classes.root}
                id="name"
                name="name"
                label="Enter your name, leave blank to be anonymous"
                value={this.state.contactName}
                onChange={this.changeName}
              />
              <TextField
                className={classes.root}
                id="email"
                name="email"
                label="Enter your email , leave blank to be anonymous"
                value={this.state.contactEmail}
                onChange={this.changeEmail}
              />

              <TextField
                className={classes.root}
                id="thanks"
                label="Enter your message here"
                multiline
                rows={4}
                value={this.state.textValue}
                onChange={this.changeText}
              />
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
    const loggedInBody = (
      <div>
        <form className="thank-form" onSubmit={this.handleSubmitLoggedIn}>
          <p className="para">
            <span className="input">
              <TextField
                className={classes.root}
                id="thanks"
                label="Enter your message here, it will go straight to their inbox"
                multiline
                rows={4}
                value={this.state.textValue}
                onChange={this.changeText}
              />
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
    const bodySuccess = (
      <div className="modal">
        <div id="success-icon">
          <div></div>
        </div>
        <button onClick={this.handleCloseSuccess}>
          <svg
            id="close-modal"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 10 10"
          >
            <line x1="1" y1="-1" x2="9" y2="11" stroke-width="2.5" />
            <line x1="9" y1="-1" x2="1" y2="11" stroke-width="2.5" />
          </svg>
        </button>

        <h1>
          <strong>Success!</strong>
        </h1>

        <hr />
        <p className="message">
          Thank you for contributing, {this.state.firstName} will receive your
          message in at most two weeks!
        </p>
      </div>
    );
    return (
      <div>
        <Stats />
        <div className="card">
          <div className="left">
            <div className="ava">
              <img className="image" src={this.state.image} />
            </div>
            <h1 className="name"> {this.state.name}</h1>

            <span className="status">{this.state.profession}</span>
          </div>
          <div className="right">
            <span className="descr">{this.state.description}</span>
            {!this.state.endOfLoop && (
              <button className="follow_btn" onClick={this.handleThank}>
                <span>Thank {this.state.firstName}</span>
              </button>
            )}
            {this.state.endOfLoop && (
              <button className="follow_btn" onClick={this.handleThank}>
                <NavLink
                  to="/submit"
                  style={{
                    textDecoration: "none",
                    fontSize: 15,
                    color: "white",
                    fontWeight: 700,
                  }}
                >
                  {" "}
                  SUBMIT SOMEONE{" "}
                </NavLink>
              </button>
            )}
          </div>
          {!this.context.token && (
            <Modal open={this.state.visible} onClose={this.handleCloseThank}>
              {body}
            </Modal>
          )}
          {this.context.token && (
            <Modal open={this.state.visible} onClose={this.handleCloseThank}>
              {loggedInBody}
            </Modal>
          )}
          <Modal open={this.state.success} onClose={this.handleCloseSuccess}>
            {bodySuccess}
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
