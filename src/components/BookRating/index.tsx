import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating
} from '@mui/material';
import { useLazyQuery } from '@apollo/client';
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
  const [renderBookRatingComponent, setRenderBookRatingComponent] =
    useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // -- Query
  const [getPreviousRating] = useLazyQuery(RATINGS_QUERY, {
    onError: (err) => console.log('Error', err),
    onCompleted: (data) => {
      const hasRating = data?.ratings?.data && data.ratings.data.length > 0;
      console.log('getPreviousRating-->', hasRating);
      console.log('data-->', data);
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
    }
  });
  // -- Custom hook
  const { addRating, updateRating } = useBookRating({
    bookId,
    currentUserRating,
    handleClose,
    setRating,
    setRenderBookRatingComponent
  });

  const handleRating = () => {
    if (action === 'create') {
      addRating({
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
  };

  useEffect(() => {
    /*getPreviousRating will run on the first render, bookId or userId changes
    # renderBookRatingComponent is set on the useBookRating hook and it's function is to signal
    that the component needs to re-render to get the updated rating of the book after a user create/update the rating*/
    getPreviousRating({
      variables: { bookId, userId },
      fetchPolicy: 'no-cache'
    });
  }, [bookId, getPreviousRating, renderBookRatingComponent, userId]);

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
        <Button onClick={handleRating}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookRating;
