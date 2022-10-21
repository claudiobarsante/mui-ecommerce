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
// -- Custom hook
import { useBookRating } from './hooks/use-book-rating';
// -- Styles
import { Colors } from 'styles/theme/colors';
import { useQueryRatings } from 'graphql/queries/ratings';

type Props = {
  bookTitle: string;
  userId: string;
  bookId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRating: Dispatch<SetStateAction<number>>;
};

const BookRating = ({
  bookTitle,
  bookId,
  userId,
  open,
  setOpen,
  setRating
}: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const { modalText, handleRating, currentUserRating, setCurrentUserRating } =
    useBookRating({
      bookId,
      bookTitle,
      userId,
      handleClose,
      setRating
    });

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
