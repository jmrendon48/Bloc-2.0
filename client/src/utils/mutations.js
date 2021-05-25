import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview(
    $title: String!
    $gameTitle: String!
    $gameCoverUrl: String!
    $reviewBody: String!
    $rating: Int!
  ) {
    addReview(
      title: $title
      gameTitle: $gameTitle
      gameCoverUrl: $gameCoverUrl
      reviewBody: $reviewBody
      rating: $rating
    ) {
      _id
      title
      gameTitle
      gameCoverUrl
      reviewBody
      rating
      createdAt
      username
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation addfollow($id: ID!) {
    addfollow(friendId: $id) {
      _id
      username
      followCount
      followers {
        _id
        username
      }
    }
  }
`;

export const EDIT_REVIEW = gql`
  mutation editReview(
    $_id: ID!
    $title: String!
    $reviewBody: String!
    $rating: Int!
  ) {
    editReview(
      _id: $id
      title: $title
      reviewBody: $reviewBody
      rating: $rating
    ) {
      _id
      title
      gameTitle
      gameCoverUrl
      reviewBody
      rating
      createdAt
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($_id: ID!) {
    removeReview(_id: $id) {
      _id
      title
      gameTitle
      gameCoverUrl
      reviewBody
      rating
      createdAt
      username
    }
  }
`;
