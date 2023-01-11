import { gql } from '@apollo/client';

export const BookFragment = gql`
  fragment BookFragment on Book {
    title
    sku
    coverImageUrl
    isOnSale
    pageCount
    price
    salePrice
    synopsis
    stock
    totalRatings
    calculatedRating
    ratings
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
`;

export const FEATURED_QUERY = gql`
  query Featured {
    books(filters: { isFeatured: { eq: true } }) {
      data {
        id
        attributes {
          ...BookFragment
        }
      }
    }
  }
  ${BookFragment}
`;

export const BOOK_QUERY = gql`
  query Book($id: ID!) {
    book(id: $id) {
      data {
        id
        attributes {
          ...BookFragment
        }
      }
    }
  }
  ${BookFragment}
`;

export const BOOKS_FILTERS_QUERY = gql`
  query BooksFilters(
    $page: Int
    $pageSize: Int
    $filters: BookFiltersInput
    $sort: [String]
  ) {
    books(
      filters: $filters
      sort: $sort
      pagination: { page: $page, pageSize: $pageSize }
    ) {
      data {
        id
        attributes {
          ...BookFragment
        }
      }
      meta {
        pagination {
          page
          pageSize
          pageCount
          total
        }
      }
    }
  }
  ${BookFragment}
`;
