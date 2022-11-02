import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import {
  UpdateBookMutation,
  UpdateBookMutationVariables
} from 'graphql/generated/graphql';

export const UPDATE_BOOK_MUTATION = gql`
  mutation UpdateBook(
    $bookId: ID!
    $userRatings: JSON!
    $rating: Float!
    $totalRatings: Int!
  ) {
    updateBook(
      id: $bookId
      data: {
        userRatings: $userRatings
        rating: $rating
        totalRatings: $totalRatings
      }
    ) {
      data {
        id
        attributes {
          userRatings
          rating
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
