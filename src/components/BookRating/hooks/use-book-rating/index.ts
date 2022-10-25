import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@apollo/client';
import { toast } from 'react-hot-toast';

// -- Mutations
import {
  CREATE_RATING_MUTATION,
  UPDATE_RATING_MUTATION
} from 'graphql/mutations/ratings';
import { useMutationBook } from 'graphql/mutations/book';
// -- Utils
import { calculateRating } from 'utils/calculate-rating';
import { RATINGS_QUERY } from 'graphql/queries/ratings';
import { BOOK_QUERY } from 'graphql/queries/books';

import { gql } from '@apollo/client';

type Props = {
  bookId: string;
  currentUserRating: number;
  handleClose: () => void;
  setRating: Dispatch<SetStateAction<number>>;
  setRenderBookRatingComponent: Dispatch<SetStateAction<boolean>>;
  userId: string;
};

const READ_RATING = gql`
  query ReadRating($id: ID!) {
    rating(id: $id) {
      data {
        id
        attributes {
          book {
            data {
              attributes {
                userRatings
                rating
              }
            }
          }
        }
      }
    }
  }
`;
export const useBookRating = ({
  bookId,
  currentUserRating,
  handleClose,
  setRating,
  setRenderBookRatingComponent,
  userId
}: Props) => {
  // -- Mutations
  //? Mutation to update the book rating on Book
  const [updateBookRating, {}] = useMutationBook({
    onError: (error) => console.log('error-updateBookRating', error),
    update: (cache, { data: updateBook }) => {
      // const readedCache: any = cache.readQuery({
      //   query: BOOK_QUERY,
      //   variables: { bookId }
      // });
      // cache.writeQuery({
      //   query: BOOK_QUERY,
      //   data: { updateBook: { ...readedCache?.updateBook, updateBook } }
      // });
      const readedCache: any = cache.readQuery({
        query: RATINGS_QUERY,
        variables: { bookId, userId }
      });
      console.log('updateBook', updateBook);
      console.log('readedCache', readedCache);
      cache.writeQuery({
        query: RATINGS_QUERY,
        data: {
          ratings: {
            ...readedCache?.ratings,
            test: {
              userRatings:
                updateBook?.updateBook?.data?.attributes?.userRatings,
              rating: updateBook?.updateBook?.data?.attributes?.rating
            }
          }
        }
      });
    },
    onCompleted: () => {
      handleClose();
      toast.success('Your rating was saved!', {
        duration: 4000,
        ariaProps: {
          role: 'status',
          'aria-live': 'polite'
        }
      });
    }
  });

  //? Mutation to add a rating for the current user and book on Rating
  const [addRating, { loading: isLoadingAddRating }] = useMutation(
    CREATE_RATING_MUTATION,
    {
      onError: (error) => console.log('error-CREATE_RATING_MUTATION', error),
      update: (cache, { data: { createRating } }) => {
        console.log('createRating', createRating);
        const readedCache = cache.readQuery({
          query: RATINGS_QUERY,
          variables: { bookId, userId }
        });
        console.log('readedCache', readedCache);
        //cache.writeQuery({query:RATINGS_QUERY,data:{ratings:}})
      },
      onCompleted: (data) => {
        setRenderBookRatingComponent(true);
        //? -- If the book don't have any ratings, it'll be initialized with default values in a JSON format
        const defaultRatingsValues = '{"1":0,"2":0,"3":0,"4":0,"5":0}';
        const userRatings =
          data.createRating.data.attributes.book.data.attributes.userRatings ||
          defaultRatingsValues;

        const { calculatedRating, updatedUserRatings } = calculateRating({
          userRatings,
          currentUserRating
        });
        //*using setRating to update de state of the current rating to the calculated one and re-render de page with the updated rating
        setRating(calculatedRating);
        updateBookRating({
          variables: {
            bookId,
            userRatings: updatedUserRatings,
            rating: calculatedRating
          }
        });
      }
    }
  );
  //? Mutation to update a previous rating for the current user and book on Rating
  const [updateRating, { loading: isLoadingUpdateRating }] = useMutation(
    UPDATE_RATING_MUTATION,
    {
      onError: () => console.log('error-UPDATE_RATING_MUTATION'),
      onCompleted: (data) => {
        console.log('update', data);
        const userRatings =
          data.updateRating.data.attributes.book.data.attributes.userRatings;

        const { calculatedRating, updatedUserRatings } = calculateRating({
          userRatings,
          currentUserRating
        });
        //*using setRating to update de state of the current rating to the calculated one and re-render de page with the updated rating
        setRating(calculatedRating);
        updateBookRating({
          variables: {
            bookId,
            userRatings: updatedUserRatings,
            rating: calculatedRating
          }
        });
      }
    }
  );
  const isLoading = isLoadingUpdateRating || isLoadingAddRating;
  return {
    addRating,
    isLoading,
    updateRating
  };
};
