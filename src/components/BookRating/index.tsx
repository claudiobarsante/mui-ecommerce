import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback
} from 'react';
import { useLazyQuery } from '@apollo/client';
import {
  Box,
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
  setTotalRatings: Dispatch<SetStateAction<number>>;
};

export type UserAction = 'create' | 'update' | null;

export type UserRatings = {
  previous: number;
  current: number;
};

export type DialogState = {
  isResponse: boolean;
  hasError: boolean;
};

const BookRating = ({
  bookTitle,
  bookId,
  userId,
  open,
  setOpen,
  setRating,
  setTotalRatings
}: Props) => {
  const [action, setAction] = useState<UserAction>(null);
  const [dialogState, setDialogState] = useState<DialogState>({
    isResponse: false,
    hasError: false
  });
  const [modalText, setModalText] = useState('');
  const [previousUserRatingId, setPreviousUserRatingId] = useState('');
  const [userRating, setUserRating] = useState<UserRatings>({
    previous: 0,
    current: 0
  });

  const handleClose = () => {
    setOpen(false);
  };

  // -- Query
  const [getRating] = useLazyQuery(RATINGS_QUERY, {
    onCompleted: (data) => {
      const hasRating = data?.ratings?.data && data.ratings.data.length > 0;
      if (hasRating) {
        const userCurrentRating: number =
          data?.ratings?.data[0].attributes?.rating!;
        const ratingId = data?.ratings?.data[0].id;
        setPreviousUserRatingId(ratingId);
        setAction('update');
        setModalText(
          `Please update your current rate of the book ${bookTitle}`
        );
        setUserRating({
          current: userCurrentRating, //to show the previous rate on the modal to the user
          previous: userCurrentRating
        });
      } else {
        setAction('create');
        setUserRating({ previous: 0, current: 0 });
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
    handleClose,
    setRating,
    userId,
    userRating,
    setTotalRatings
  });

  const handleRating = useCallback(() => {
    if (action === 'create') {
      createRating({
        variables: {
          userId,
          bookId,
          rating: userRating.current
        }
      });
    }

    if (action === 'update') {
      updateRating({
        variables: {
          ratingId: previousUserRatingId,
          rating: userRating.current
        }
      });
    }
  }, [
    action,
    createRating,
    userId,
    bookId,
    userRating,
    updateRating,
    previousUserRatingId
  ]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Rating</DialogTitle>
      <Box hidden={dialogState.isResponse}>
        <DialogContent>
          <DialogContentText>{modalText}</DialogContentText>
          <Rating
            name="book-rating"
            value={userRating.current}
            sx={{ color: Colors.warning }}
            onChange={(event, newValue) => {
              setUserRating((ratings) => ({
                ...ratings,
                current: newValue ?? 0
              }));
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton loading={isLoading} onClick={handleRating}>
            Save
          </LoadingButton>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default BookRating;
