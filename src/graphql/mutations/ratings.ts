import { gql } from '@apollo/client';

export const RatingFragment = gql`
  fragment RatingFragment on Rating {
    rating
    book {
      data {
        attributes {
          sku
          ratings
          calculatedRating
        }
      }
    }
  }
`;

export const CREATE_RATING_MUTATION = gql`
  mutation CreateRating($userId: [ID], $bookId: ID!, $rating: Float!) {
    createRating(data: { user_ids: $userId, book: $bookId, rating: $rating }) {
      data {
        id
        attributes {
          ...RatingFragment
        }
      }
    }
  }
  ${RatingFragment}
`;

export const UPDATE_RATING_MUTATION = gql`
  mutation UpdateRating($ratingId: ID!, $rating: Float!) {
    updateRating(id: $ratingId, data: { rating: $rating }) {
      data {
        id
        attributes {
          ...RatingFragment
        }
      }
    }
  }
  ${RatingFragment}
`;
