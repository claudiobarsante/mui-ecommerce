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

type Props = {
  bookId: string;
  currentUserRating: number;
  handleClose: () => void;
  setRating: Dispatch<SetStateAction<number>>;
  setRenderBookRatingComponent: Dispatch<SetStateAction<boolean>>;
};

export const useBookRating = ({
  bookId,
  currentUserRating,
  handleClose,
  setRating,
  setRenderBookRatingComponent
}: Props) => {
  // -- Mutations
  //? Mutation to update the book rating on Book
  const [updateBookRating, {}] = useMutationBook({
    onError: (err) => console.log('Error', err),
    onCompleted: (data) => {
      handleClose();
      toast.success('Your rating was added!', { duration: Infinity });
    }
  });

  //? Mutation to add a rating for the current user and book on Rating
  const [addRating, { loading: isLoadingAddRating }] = useMutation(
    CREATE_RATING_MUTATION,
    {
      onError: (err) => console.log('Error', err),
      onCompleted: (data) => {
        setRenderBookRatingComponent(true);
        const userRatings =
          data.createRating.data.attributes.book.data.attributes.userRatings;

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
      onError: (err) => {
        console.log('Error', err);
        toast.error('An error ocuuref', { duration: 5000 });
      },
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
