import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
// -- Query
import { RATINGS_QUERY, useQueryRatings } from 'graphql/queries/ratings';
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
  bookTitle: string;
  userId: string;
  handleClose: () => void;
  setRating: Dispatch<SetStateAction<number>>;
};

type UserAction = 'create' | 'update' | null;

export const useBookRating = ({
  bookId,
  bookTitle,
  userId,
  handleClose,
  setRating
}: Props) => {
  const [action, setAction] = useState<UserAction>(null);
  const [currentUserRating, setCurrentUserRating] = useState(0);
  const [modalText, setModalText] = useState('');

  // -- Query
  const { data, error, loading } = useQueryRatings({
    variables: { bookId, userId }
  });
  //const [getRating, { loading, error, data }] = useLazyQuery(RATINGS_QUERY);

  // -- Mutations
  const [updateBookRating, {}] = useMutationBook({
    onError: (err) => console.log('Error', err),
    onCompleted: (data) => {
      handleClose();
    }
  });

  const [createRating, { error: createError, loading: createLoading }] =
    useMutation(CREATE_RATING_MUTATION, {
      onError: (err) => console.log('Error', err),
      onCompleted: (data) => {
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
    });

  const [updateRating, {}] = useMutation(UPDATE_RATING_MUTATION, {
    onError: (err) => console.log('Error', err),
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
  });

  const handleRating = () => {
    if (action === 'create') {
      createRating({
        variables: {
          userId,
          bookId,
          rating: currentUserRating
        }
      });
    }

    if (action === 'update') {
      const ratingId = data?.ratings?.data[0].id;
      updateRating({
        variables: {
          ratingId,
          rating: currentUserRating
        }
      });
    }
  };

  useEffect(() => {
    const hasRating = data?.ratings?.data && data.ratings.data.length > 0;

    if (hasRating) {
      const userCurrentRating = data?.ratings?.data[0].attributes?.rating!;
      setAction('update');
      setModalText(`Please update your current rate of the book ${bookTitle}`);
      setCurrentUserRating(userCurrentRating);
    } else {
      setAction('create');
      setCurrentUserRating(0);
      setModalText(`Please rate the book ${bookTitle}`);
    }
  }, [bookTitle, data?.ratings?.data]);

  return {
    currentUserRating,
    setCurrentUserRating,
    modalText,
    handleRating
  };
};
