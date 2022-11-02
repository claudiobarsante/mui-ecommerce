import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@apollo/client';

// -- Mutations
import {
  CREATE_RATING_MUTATION,
  UPDATE_RATING_MUTATION
} from 'graphql/mutations/ratings';
import { useMutationBook } from 'graphql/mutations/book';
// -- Utils
import { calculateRating } from 'utils/shared/calculate-rating';
import { RATINGS_QUERY } from 'graphql/queries/ratings';
import { DialogState, UserRatings } from 'templates/BookPage';

type Props = {
  bookId: string;
  setRating: Dispatch<SetStateAction<number>>;
  userId: string;
  userRating: UserRatings;
  setTotalRatings: Dispatch<SetStateAction<number>>;
  setDialogState: Dispatch<SetStateAction<DialogState>>;
};

export const useBookRating = ({
  bookId,
  setRating,
  userId,
  userRating,
  setTotalRatings,
  setDialogState
}: Props) => {
  function errorSetting() {
    const MESSAGE =
      "Your rating wasn't saved due to a techinical issue on your end.Please try connecting again. If the issue keeps happening, contact Customer Care.";
    setDialogState({ isResponse: true, hasError: true, modalText: MESSAGE });
  }
  // -- Mutations
  //? Mutation to update the book rating on Book
  const [updateBookRating] = useMutationBook({
    onError: () => errorSetting(),
    onCompleted: () => {
      setDialogState({
        isResponse: true,
        hasError: false,
        modalText: 'Your rating was successfully saved'
      });
    }
  });

  //? Mutation to add a rating for the current user and book on Rating
  const [createRating, { loading: isLoadingAddRating }] = useMutation(
    CREATE_RATING_MUTATION,
    {
      onError: () => errorSetting(),
      update: (cache, data) => {
        //? updating the cache after creating a new rating will force to re-run the query getRating, so the user will have the updated ratings on the screen
        const readedCache: any = cache.readQuery({
          query: RATINGS_QUERY,
          variables: { bookId, userId }
        });

        const ratingId = data.data.createRating.data.id;
        const updatedUserRatings =
          data.data.createRating.data.attributes.book.data.attributes
            .userRatings;
        const updatedRating =
          data.data.createRating.data.attributes.book.data.attributes.rating;

        cache.writeQuery({
          query: RATINGS_QUERY,
          variables: { bookId, userId },
          data: {
            ratings: {
              ...readedCache?.ratings,
              data: [
                {
                  id: ratingId,
                  attributes: {
                    user_ids: { data: [{ id: userId }] },
                    rating: userRating.current,
                    book: {
                      data: {
                        id: bookId,
                        attributes: {
                          userRatings: updatedUserRatings,
                          rating: updatedRating
                        }
                      }
                    }
                  }
                }
              ]
            }
          }
        });
      },
      onCompleted: (data) => {
        //handleClose();
        //? -- If the book don't have any ratings, it'll be initialized with default values in a JSON format
        const defaultRatingsValues = '{"1":0,"2":0,"3":0,"4":0,"5":0}';
        const userRatings =
          data.createRating.data.attributes.book.data.attributes.userRatings ||
          defaultRatingsValues;

        const { calculatedRating, updatedUserRatings, totalBookRatings } =
          calculateRating({
            userRatings,
            currentUserRating: userRating.current,
            action: 'create'
          });
        //*using setRating to update de state of the current rating to the calculated one and re-render de page with the updated rating
        setRating(calculatedRating);
        setTotalRatings(totalBookRatings);
        updateBookRating({
          variables: {
            bookId,
            userRatings: updatedUserRatings,
            rating: calculatedRating,
            totalRatings: totalBookRatings
          }
        });
      }
    }
  );

  //? Mutation to update a previous rating for the current user and book on Rating
  const [updateRating, { loading: isLoadingUpdateRating }] = useMutation(
    UPDATE_RATING_MUTATION,
    {
      onError: () => errorSetting(),
      update: (cache, data) => {
        //? updating the cache after updating
        const readedCache: any = cache.readQuery({
          query: RATINGS_QUERY,
          variables: { bookId, userId }
        });

        const ratingId = data.data.updateRating.data.id;
        const updatedUserRatings =
          data.data.updateRating.data.attributes.book.data.attributes
            .userRatings;
        const updatedRating =
          data.data.updateRating.data.attributes.book.data.attributes.rating;

        cache.writeQuery({
          query: RATINGS_QUERY,
          variables: { bookId, userId },
          data: {
            ratings: {
              ...readedCache?.ratings,
              data: [
                {
                  id: ratingId,
                  attributes: {
                    user_ids: { data: [{ id: userId }] },
                    rating: userRating.current,
                    book: {
                      data: {
                        id: bookId,
                        attributes: {
                          userRatings: updatedUserRatings,
                          rating: updatedRating
                        }
                      }
                    }
                  }
                }
              ]
            }
          }
        });
      },
      onCompleted: (data) => {
        const userRatings =
          data.updateRating.data.attributes.book.data.attributes.userRatings;

        const { calculatedRating, updatedUserRatings, totalBookRatings } =
          calculateRating({
            userRatings,
            currentUserRating: userRating.current,
            action: 'update',
            previousUserRating: userRating.previous
          });
        //*using setRating to update de state of the current rating to the calculated one and re-render de page with the updated rating
        setRating(calculatedRating);
        setTotalRatings(totalBookRatings);
        updateBookRating({
          variables: {
            bookId,
            userRatings: updatedUserRatings,
            rating: calculatedRating,
            totalRatings: totalBookRatings
          }
        });
      }
    }
  );

  const isLoading = isLoadingUpdateRating || isLoadingAddRating;

  return {
    createRating,
    isLoading,
    updateRating
  };
};
