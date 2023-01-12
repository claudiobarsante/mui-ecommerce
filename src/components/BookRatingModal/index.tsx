import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Ref
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
//import { DialogState, UserAction, UserRatings } from 'templates/BookPage';
// -- Utils
import { BookProps } from 'utils/mappers';

export type UserAction = 'create' | 'update' | null;
export type UserRating = {
  id: string | null;
  previous: number;
  current: number;
};

type BookRatingModalProps = {
  book: BookProps;
  userId: string | undefined;
};

export type ModalHandle = {
  openModal: () => void;
};
// eslint-disable-next-line react/display-name
const BookRatingModal = forwardRef(
  (props: BookRatingModalProps, ref: Ref<ModalHandle>) => {
    const { book, userId } = props;
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState<UserAction>(null);
    const [userRating, setUserRating] = useState<UserRating>({
      id: null,
      previous: 0,
      current: 0
    });

    /* to open the modal on the BookPageTemplate, pass the setter function call
    on the "openModal" prop
    */
    useImperativeHandle(
      ref,
      () => {
        return { openModal: () => setOpen(true) };
      },
      []
    );
    // const handleClose = () => {
    //   setOpen(false);
    //   setDialogState((previous) => ({
    //     ...previous,
    //     isResponse: false,
    //     hasError: false
    //   }));
    // };

    // -- Custom hook
    const { getCurrentUserRating } = useBookRating({
      bookId: book.id,
      //  setRating,
      userId: userId!

      // userRating,
      // setTotalRatings,
      // setDialogState
    });

    useEffect(() => {
      getCurrentUserRating({
        variables: {
          bookId: book.id,
          userId: userId!
        },
        onCompleted: (data) => {
          console.log('data', data);
          const hasBookUserRating = data?.ratings?.data.length > 0;
          if (hasBookUserRating) {
            setAction('update');
            setUserRating((previous) => ({
              ...previous,
              id: data?.ratings?.data[0].id,
              previous: data?.ratings?.data[0].attributes.rating
            }));
          } else {
            setAction('create');
          }
        }
      });
    }, [book.id, getCurrentUserRating, props.book.id, props.userId, userId]);

    // const handleRating = () => {
    //   if (action === 'create') {
    //     createRating({
    //       variables: {
    //         userId,
    //         bookId,
    //         rating: userRating.current
    //       }
    //     });
    //   }

    //   if (action === 'update') {
    //     updateRating({
    //       variables: {
    //         ratingId: previousUserRatingId,
    //         rating: userRating.current
    //       }
    //     });
    //   }
    // };

    //if (dialogState?.modalText === '') return null;

    return (
      <Dialog
        open={open}
        //onClose={handleClose}
        disableEscapeKeyDown={true}
        aria-labelledby="user-interaction"
        aria-label="Dialog for user interacation"
      >
        <DialogTitle>Rating</DialogTitle>
        {/* {dialogState?.isResponse ? (
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
      )} */}
      </Dialog>
    );
  }
);

export default BookRatingModal;
