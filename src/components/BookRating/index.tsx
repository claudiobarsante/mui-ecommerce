import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
// -- Custom hook
import { useBookRating } from './hooks/use-book-rating';
// -- Styles
import { Colors } from 'styles/theme/colors';
// -- Query
import { RATINGS_QUERY } from 'graphql/queries/ratings';

type Props = {
  bookTitle: string;
  userId: string;
  bookId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRating: Dispatch<SetStateAction<number>>;
};

type UserAction = 'create' | 'update' | null;

const BookRating = ({
  bookTitle,
  bookId,
  userId,
  open,
  setOpen,
  setRating
}: Props) => {
  const [action, setAction] = useState<UserAction>(null);
  const [currentUserRating, setCurrentUserRating] = useState(0);
  const [modalText, setModalText] = useState('');
  const [previousUserRatingId, setPreviousUserRatingId] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  // -- Query
  const [getRating] = useLazyQuery(RATINGS_QUERY, {
    onCompleted: (data) => {
      const hasRating = data?.ratings?.data && data.ratings.data.length > 0;
      if (hasRating) {
        const userCurrentRating = data?.ratings?.data[0].attributes?.rating!;
        const ratingId = data?.ratings?.data[0].id;
        setPreviousUserRatingId(ratingId);
        setAction('update');
        setModalText(
          `Please update your current rate of the book ${bookTitle}`
        );
        setCurrentUserRating(userCurrentRating);
      } else {
        setAction('create');
        setCurrentUserRating(0);
        setModalText(`Please rate the book ${bookTitle}`);
      }
    },
    onError: (error) => {
      console.log('Error-getRating', error);
    }
  });

  useEffect(() => {
    getRating({ variables: { bookId, userId } });
  }, [bookId, bookTitle, getRating, userId]);

  // -- Custom hook
  const { createRating, isLoading, updateRating } = useBookRating({
    bookId,
    currentUserRating,
    handleClose,
    setRating,
    userId
  });

  const handleRating = useCallback(() => {
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
      updateRating({
        variables: {
          ratingId: previousUserRatingId,
          rating: currentUserRating
        }
      });
    }
  }, [
    action,
    createRating,
    bookId,
    currentUserRating,
    previousUserRatingId,
    updateRating,
    userId
  ]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rating</DialogTitle>
      <DialogContent>
        <DialogContentText>{modalText}</DialogContentText>
        <Rating
          name="book-rating"
          value={currentUserRating}
          sx={{ color: Colors.warning }}
          onChange={(event, newValue) => {
            setCurrentUserRating(newValue ?? 0);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton loading={isLoading} onClick={handleRating}>
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default BookRating;
