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
  ) {
    addReview(
      title: $title
      gameTitle: $gameTitle
      gameCoverUrl: $gameCoverUrl
      reviewBody: $reviewBody
    ) {
      _id
      title
      gameTitle
      gameCoverUrl
      reviewBody
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

export const GAME_SAVED = gql`
  mutation addGame(
    $name: String!,
    $gameId: String!,
    $coverUrl: String!,
    $summary: String!
  ){
  addGame(
    name: $name,
    gameId: $gameId,
    coverUrl: $coverUrl,
    summary: $summary
  ){
    _id
    name
    gameId
    coverUrl
    summary
  }
}
`;