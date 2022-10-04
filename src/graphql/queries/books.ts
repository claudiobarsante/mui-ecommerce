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

export const FEATURED_QUERY = gql`
  query Featured {
    books(filters: { isFeatured: { eq: true } }) {
      data {
        id
        attributes {
          title
          price
          coverImageUrl
          rating
        }
      }
    }
  }
`;

export const BOOK_QUERY = gql`
  query Book($id: ID!) {
    book(id: $id) {
      data {
        id
        attributes {
          title
          coverImageUrl
          isOnSale
          pageCount
          price
          rating
          salePrice
          synopsis
          authors {
            data {
              attributes {
                name
              }
            }
          }
          publisher {
            data {
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;
