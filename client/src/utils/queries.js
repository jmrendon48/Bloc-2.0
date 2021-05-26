import gql from "graphql-tag";

export const QUERY_REVIEWS = gql`
  query reviews($username: String) {
    reviews(username: $username) {
      _id
      title
      gameTitle
      gameId
      reviewBody
      createdAt
      gameCoverUrl
      rating
      username
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reviews {
        _id
        title
        gameTitle
        gameId
        reviewBody
        createdAt
        gameCoverUrl
        rating
      }
      reviewCount
      follows {
        _id
        username
      }
      followCount
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      reviews {
        _id
        title
        gameTitle
        gameId
        reviewBody
        createdAt
        gameCoverUrl
        rating
      }
      reviewCount
      follows {
        _id
        username
      }
      followCount
    }
  }
`;

export const QUERY_REVIEWGAME = gql`
  query reviewGame($gameId: String!) {
    reviewGame(gameId: $gameId) {
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

export const QUERY_GAME = gql`
  query game($gameId: String!){
    game(gameId: $gameId){
      _id
      name
      gameId
      coverUrl
      summary
    }
  }`

  export const QUERY_GAMES = gql`
  query games{
    games{
      _id
      name
      gameId
      coverUrl
      summary
    }
  }`