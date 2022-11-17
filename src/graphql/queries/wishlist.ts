import { gql } from '@apollo/client';
import { WishlistFragment } from 'graphql/mutations/wishlist';

export const WISHLIST_QUERY = gql`
  query Wishlist($id: ID!) {
    wishlist(id: $id) {
      data {
        attributes {
          ...WishlistFragment
        }
      }
    }
  }
  ${WishlistFragment}
`;

export const WISHLISTS_QUERY = gql`
  query Wishlists($userId: ID!, $bookId: ID!) {
    wishlists(
      filters: {
        user: { id: { eq: $userId } }
        and: { books: { id: { eq: $bookId } } }
      }
    ) {
      data {
        id
        attributes {
          ...WishlistFragment
        }
      }
    }
  }
  ${WishlistFragment}
`;
