import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      name
      email
    }
  }
`;
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      bookCount
      savedBooks
    }
  }
`;