import { gql } from '@apollo/client';

export const WishlistFragment = gql`
  fragment WishlistFragment on Wishlist {
    user {
      data {
        id
      }
    }
    books {
      data {
        id
        attributes {
          title
          sku
          coverImageUrl
          isOnSale
          pageCount
          ratings
          price
          calculatedRating
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
export const CREATE_WISHLIST_MUTATION = gql`
  mutation CreateWishlist($data: WishlistInput!) {
    createWishlist(data: $data) {
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

export const UPDATE_WISHLIST_MUTATION = gql`
  mutation UpdateWishlist($id: ID!, $data: WishlistInput!) {
    updateWishlist(id: $id, data: $data) {
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

/**
 * {
  "id": "1",
  "data": {
    "user": "1",
    "books": ["2","7","8"]             
             
  }
}
 */

export const DELETE_WISHLIST_MUTATION = gql`
  mutation DeleteWishlist($id: ID!) {
    deleteWishlist(id: $id) {
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
