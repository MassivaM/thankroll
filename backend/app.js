const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
  type RootQuery{
      profiles: [String!]!
  }
  type RootMutation{
      createProfile(name: String): String
  }
  schema {
    query:RootQuery
    mutation: RootMutation
  }
  `),
    rootValue: {
      profiles: () => {
        //return list of profiles
        return ["Marie-Ève Ferron", "Olivier Chartrand", "Ayla Mahamli"];
      },
      createProfile: (args) => {
        const profileName = args.name;
        return profileName;
      },
    },
    graphiql: true,
  })
);
//host for the page
app.listen(4000);
