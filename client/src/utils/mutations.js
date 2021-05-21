import gql from 'graphql-tag';

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
  mutation addReview($title: String!, $reviewBody: String!) {
    addReview(title: $title, reviewBody: $reviewBody) {
      _id
      title
      reviewBody
      createdAt
      username
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($id: ID!) {
    followUser(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;