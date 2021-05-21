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