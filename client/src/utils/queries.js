import gql from 'graphql-tag';

export const QUERY_REVIEWS = gql`
  query reviews($username: String) {
    reviews(username: $username) {
      _id
      title
      reviewBody
      createdAt
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
        title
      }
      reviewsCount 
      follow {
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
        reviewBody
        createdAt
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