import { gql } from '@apollo/client';

export const BookFragment = gql`
  fragment BookFragment on Book {
    title
    sku
    coverImageUrl
    isOnSale
    pageCount
    userRatings
    price
    rating
    salePrice
    synopsis
    stock
    totalRatings
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

/**
 * Strapi has a bug that, if you want to use "or", you have to group with another clause. So, in this case I'm using the field price and filtering every book that has price greater than -1 and the group  the or clause
 * Here is the answer of a Strapi Engineer -->
 * If you want to use or, you need to pass all the targeted clauses inside its array, putting the or next to another clause will create an and clause between the or components and the other ones.
 * Basically, what should work would be smth like: or: [{ slug: { eq: $slug } }, { itSlug: { eq: $slug } }]
 */
export const BOOKS_SEARCH_QUERY = gql`
  query BooksSearch($searchText: String) {
    books(
      filters: {
        price: { gt: -1 }
        or: [
          { title: { containsi: $searchText } }
          { authors: { name: { containsi: $searchText } } }
          { publisher: { name: { containsi: $searchText } } }
        ]
      }
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
`;

/**
 * query BookByAuthor{
  books(filters:{authors:{name:{in:["J. R. R. Tolkien"]}}}){
    data{
      id      
      attributes{
        title
        slug
      }
    }
  }
}
 */

/**
 * import { gql } from '@apollo/client';

// todo: not using, remove it
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
          sku
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
          sku
          coverImageUrl
          isOnSale
          pageCount
          userRatings
          price
          rating
          salePrice
          synopsis
          stock
          totalRatings
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
          title
          sku
          price
          coverImageUrl
          rating
          authors {
            data {
              id
              attributes {
                name
              }
            }
          }
          publisher {
            data {
              id
              attributes {
                name
              }
            }
          }
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
`;

/**
 * query BookByAuthor{
  books(filters:{authors:{name:{in:["J. R. R. Tolkien"]}}}){
    data{
      id      
      attributes{
        title
        slug
      }
    }
  }
}
 */
