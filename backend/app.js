const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const app = express();

const Profile = require("./models/profiles");

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
   
    input ProfileInput{
      name: String!
      description: String!
      profession: String!
      picture: String!
      date: String!
    }
  type RootQuery{
      profiles: [Profile!]!
  }
  type RootMutation{
      createProfile(profileinput: ProfileInput): Profile
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
        });
        return profile
          .save()
          .then((result) => {
            console.log(result);
            return { ...result._doc };
          })
          .catch((err) => {
            console.log(err);
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
