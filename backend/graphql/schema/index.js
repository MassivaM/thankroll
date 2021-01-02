const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Profile{
      _id: ID!
      name: String!
      description: String!
      profession: String!
      picture: String!
      date: String!
      creator:User!
     
    }
   type User{
     _id: ID
     email: String!
     password: String
     createdProfiles: [Profile!]
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
  `);
