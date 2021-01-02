const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();

const Profile = require("./models/profiles");
const User = require("./models/user");
app.use(bodyParser.json());
//created a file type to describe the pictures uploaded
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`

    type Profile{
      _id: ID!
      name: String!
      description: String!
      profession: String!
      picture: String!
      date: String!
     
    }
   type User{
     _id: ID
     email: String!
     password: String
   }
    input ProfileInput{
      name: String!
      description: String!
      profession: String!
      picture: String!
      date: String!
    }
    input UserInput{
      email: String!
      password: String
    }
  type RootQuery{
      profiles: [Profile!]!
  }
  type RootMutation{
      createProfile(profileinput: ProfileInput): Profile
      createUser(userinput : UserInput): User
  }
  schema {
    query:RootQuery
    mutation: RootMutation
  }
  `),
    rootValue: {
      profiles: () => {
        //return all entries in collection
        return Profile.find()
          .then((profiles) => {
            return profiles.map((profile) => {
              return { ...profile._doc };
            });
          })
          .catch((err) => {
            throw err;
          });
      },
      createProfile: (args) => {
        const profile = new Profile({
          name: args.profileinput.name,
          description: args.profileinput.description,
          profession: args.profileinput.profession,
          picture: args.profileinput.picture,
          date: new Date(args.profileinput.date),
          creator: "5ff0a51bb0a68647e9f73939",
        });
        let createdprofile;
        return profile
          .save()
          .then((result) => {
            createdprofile = { ...result._doc };
            return User.findById("5ff0a51bb0a68647e9f73939");
          })
          .then((user) => {
            if (!user) {
              throw new Error("User not found");
            }
            user.createdProfiles.push(profile);
            return user.save();
          })
          .then((result) => {
            return createdprofile;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      createUser: (args) => {
        return User.findOne({ email: args.userinput.email })
          .then((user) => {
            if (user) {
              throw new Error("User exists already");
            }
            return bcrypt.hash(args.userinput.password, 12);
          })

          .then((hashedPassword) => {
            const user = new User({
              email: args.userinput.email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            return { ...result._doc, _id: result.id };
          })
          .catch((err) => {
            throw err;
          });
      },
    },
    graphiql: true,
  })
);
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vcfwq.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(4000);
  })
  .catch((err) => {
    console.log(err);
  });
