import { gql } from '@apollo/client';

export const BOOKS_QUERY = gql`
  query Books {
    books {
      data {
        attributes {
          title
          synopsis
        }
      }
    }
  }
`;
