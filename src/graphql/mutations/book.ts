import { gql, useMutation, MutationHookOptions } from '@apollo/client';
import {
  UpdateBookMutation,
  UpdateBookMutationVariables
} from 'graphql/generated/graphql';

export const BOOK_MUTATION = gql`
  mutation UpdateBook($bookId: ID!, $userRatings: JSON!, $rating: Float!) {
    updateBook(
      id: $bookId
      data: { userRatings: $userRatings, rating: $rating }
    ) {
      data {
        id
        attributes {
          userRatings
          rating
        }
      }
    }
  }
`;

export function useMutationBook(
  options?: MutationHookOptions<UpdateBookMutation, UpdateBookMutationVariables>
) {
  return useMutation<UpdateBookMutation, UpdateBookMutationVariables>(
    BOOK_MUTATION,
    options
  );
}
