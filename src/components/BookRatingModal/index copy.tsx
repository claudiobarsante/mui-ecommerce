import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState
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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
// -- Custom hook
import { useBookRating } from './hooks/use-book-rating';
// -- Styles
import { Colors } from 'styles/theme/colors';
// -- Query
import { RATINGS_QUERY } from 'graphql/queries/ratings';
import { DialogState, UserAction, UserRatings } from 'templates/BookPage';

type Props = {
  action: UserAction;
  bookId: string;
  bookTitle: string;
  dialogState: DialogState;
  open: boolean;
  previousUserRatingId: string;
  setDialogState: Dispatch<SetStateAction<DialogState>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRating: Dispatch<SetStateAction<number>>;
  setTotalRatings: Dispatch<SetStateAction<number>>;
  setUserRating: Dispatch<SetStateAction<UserRatings>>;
  userId: string;
  userRating: UserRatings;
};

const BookRatingModal = ({
  action,
  bookId,
  dialogState,
  open,
  previousUserRatingId,
  setDialogState,
  setOpen,
  setRating,
  setTotalRatings,
  setUserRating,
  userId,
  userRating
}: Props) => {
  const handleClose = () => {
    setOpen(false);
    setDialogState((previous) => ({
      ...previous,
      isResponse: false,
      hasError: false
    }));
  };

  // -- Custom hook
  const { createRating, isLoading, updateRating } = useBookRating({
    bookId,
    setRating,
    userId,
    userRating,
    setTotalRatings,
    setDialogState
  });

  const handleRating = () => {
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
  };

  if (dialogState?.modalText === '') return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableEscapeKeyDown={true}
      aria-labelledby="user-interaction"
      aria-label="Dialog for user interacation"
    >
      <DialogTitle>Rating</DialogTitle>
      {dialogState?.isResponse ? (
        <Box id="rating-status-response">
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {dialogState?.hasError ? (
              <CancelIcon
                sx={{ fontSize: 60, color: Colors.error, marginBottom: 2 }}
              />
            ) : (
              <CheckCircleIcon
                sx={{ fontSize: 60, color: Colors.primary, marginBottom: 2 }}
              />
            )}
            <DialogContentText>{dialogState.modalText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Box>
      ) : (
        <Box id="add-update-rating">
          <DialogContent>
            <DialogContentText>{dialogState?.modalText}</DialogContentText>
            <Rating
              name="book-rating"
              value={userRating?.current}
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
      )}
    </Dialog>
  );
};

export default BookRatingModal;
