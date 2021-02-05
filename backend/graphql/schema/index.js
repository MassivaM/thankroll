const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Thanking
    {
    _id: ID!
    profile: Profile!
    user: User!
    createdAt: String!
    updatedAt: String!
    message: String!
    }
    type Profile{
      _id: ID!
      firstName: String!
      lastName:String
      description: String!
      profession: String!
      picture: String
      email:String!
      accept:Boolean!
      createdAt: String!
      creator:User!
     
    }
   type User{
     _id: ID
     email: String!
     password: String
     createdProfiles: [Profile!]
     firstName: String!
     lastName: String
     peopleThanked : Int!
   }
   type AuthData{
       userId: ID!
       token: String!
       tokenExpiration: Int!
   }
    input ProfileInput{
      firstName: String!
      lastName:String
      description: String!
      profession: String!
      picture: String
      email:String!
      accept:Boolean!
  
    }
    input UserInput{
      email: String!
      password: String
      firstName: String!
      lastName: String
    }
  type RootQuery{
      profiles: [Profile!]!
      thanks: [Thanking!]!
      login(email:String!, password:String!): AuthData!
  }
  type RootMutation{
      createProfile(profileinput: ProfileInput): Profile
      createUser(userinput : UserInput): User
      thankProfile(profileId: ID!, message: String!): Thanking!
      cancelThanking(thankingId: ID!): Profile!
      uploadImage(filename: String!): String!
  }
  schema {
    query:RootQuery
    mutation: RootMutation
  }
  `);
