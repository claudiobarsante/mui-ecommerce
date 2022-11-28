import { gql } from '@apollo/client';

export const FILTERS_QUERY = gql`
  query Filters {
    authors(sort: ["name"]) {
      data {
        id
        attributes {
          name
        }
      }
    }
    publishers(sort: ["name"]) {
      data {
        id
        attributes {
          name
        }
      }
    }
    categories(sort: ["name"]) {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;
