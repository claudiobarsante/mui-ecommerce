import { gql, QueryHookOptions, useQuery } from '@apollo/client';
import { RatingsQuery, RatingsQueryVariables } from 'graphql/generated/graphql';

export const RATINGS_QUERY = gql`
  query Ratings($bookId: ID!, $userId: ID!) {
    ratings(
      filters: {
        book: { id: { eq: $bookId } }
        and: { user_ids: { id: { eq: $userId } } }
      }
    ) {
      data {
        id
        attributes {
          user_ids {
            data {
              id
            }
          }
          book {
            data {
              id
              attributes {
                sku
                userRatings
                rating
              }
            }
          }
          rating
        }
      }
    }
  }
`;

export function useQueryRatings(
  options?: QueryHookOptions<RatingsQuery, RatingsQueryVariables>
) {
  return useQuery<RatingsQuery, RatingsQueryVariables>(RATINGS_QUERY, options);
}
