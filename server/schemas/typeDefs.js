const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    reviews: [Review]
    reviewCount: Int
    follows: [User]
    followCount: Int
  }

  type Review {
    _id: ID    
    authors: String 
    description: String
    gameId: String    
    image: String
    link: String
    title: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addReview(thoughtText: String!): Thought
    addFollow(followId: ID!): User
  }
  
  type Auth {
    token: ID!
    user: User
  }
`;


// export the typeDefs
module.exports = typeDefs;