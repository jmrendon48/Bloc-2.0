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
    title: String
    gameTitle: String
    gameCoverUrl: String
    reviewBody: String
    createdAt: String
    username: String
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    reviews(username: String): [Review]
    review(_id: ID!): Review
    reviewGame(gameTitle: String!): [Review]
  } 

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addReview(title: String!, gameTitle: String!, gameCoverUrl: String!, reviewBody: String!): Review
    addFollow(followId: ID!): User
    removeFollow(followId: ID!): User
    editReview(_id: ID!, title: String!, reviewBody: String!): Review
    deleteReview(_id: ID!): Review
  }
  
  type Auth {
    token: ID!
    user: User
  }
`;

// export the typeDefs
module.exports = typeDefs;