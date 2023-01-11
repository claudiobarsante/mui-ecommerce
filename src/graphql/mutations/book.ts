import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import {
  UpdateBookMutation,
  UpdateBookMutationVariables
} from 'graphql/generated/graphql';

export const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBook(
    $bookId: ID!
    $ratings: JSON!
    $calculatedRating: Float!
    $totalRatings: Int!
  ) {
    updateBook(
      id: $bookId
      data: {
        ratings: $ratings
        calculatedRating: $calculatedRating
        totalRatings: $totalRatings
      }
    ) {
      data {
        id
        attributes {
          ratings
          calculatedRating
          totalRatings
        }
      }
    }
  }
`;

export function useMutationBook(
  options?: MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>
) {
  return useMutation<UpdateBookMutation, UpdateBookMutationVariables>(
    UPDATE_BOOK_MUTATION,
    options
  );
}
