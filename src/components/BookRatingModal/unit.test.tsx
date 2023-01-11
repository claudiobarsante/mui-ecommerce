import { act, waitFor, screen, renderWithTheme } from 'utils/tests/helpers';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import BookRatingModal from 'components/BookRatingModal';
// -- Query
import { RATINGS_QUERY } from 'graphql/queries/ratings';
import React from 'react';
import { DialogState, UserRatings } from 'templates/BookPage';
//import { useBookRating } from './hooks/use-book-rating';
const hasRatingMock = {
  request: {
    query: RATINGS_QUERY,
    variables: { bookId: '8', userId: '1' }
  },
  result: {
    data: {
      ratings: {
        __typename: 'RatingEntityResponseCollection',
        data: [
          {
            __typename: 'RatingEntity',
            id: '127',
            attributes: {
              __typename: 'Rating',
              user_ids: {
                __typename: 'UsersPermissionsUserRelationResponseCollection',
                data: [
                  {
                    __typename: 'UsersPermissionsUserEntity',
                    id: '1'
                  }
                ]
              },
              book: {
                __typename: 'BookEntityResponse',
                data: {
                  __typename: 'BookEntity',
                  id: '8',
                  attributes: {
                    __typename: 'Book',
                    userRatings: '{"0":0,"1":17,"2":4,"3":5,"4":15,"5":34}',
                    rating: 3.6
                  }
                }
              },
              rating: 2
            }
          }
        ]
      }
    }
  }
};

const noRatingMock = {
  request: {
    query: RATINGS_QUERY,
    variables: { bookId: '8', userId: '1' }
  },
  result: {
    data: {
      ratings: {
        __typename: 'RatingEntityResponseCollection',
        data: []
      }
    }
  }
};

describe('<BookRating/>', () => {
  const setOpen = jest.fn();
  const setRating = jest.fn();
  const setTotalRatings = jest.fn();
  const setUserRating = jest.fn();
  const setDialogState = jest.fn();

  it('should render <BookRating/> for update', async () => {
    const dialogStateMock: DialogState = {
      isResponse: false,
      hasError: false,
      modalText:
        'Please update your current rate of the book A Gentleman in Moscow'
    };
    const useBookRating = jest.spyOn(
      require('./hooks/use-book-rating'),
      'useBookRating'
    );
    const updateRating = jest.fn();

    useBookRating.mockImplementation(() => ({
      createRating: jest.fn(),
      isLoading: false,
      updateRating
    }));

    const { debug, container } = renderWithTheme(
      <MockedProvider mocks={[hasRatingMock]} addTypename={false}>
        <BookRatingModal
          action={'update'}
          bookId={'8'}
          bookTitle={'A Gentleman in Moscow'}
          dialogState={dialogStateMock}
          open={true}
          previousUserRatingId={'127'}
          setDialogState={setDialogState}
          setOpen={setOpen}
          setRating={setRating}
          setTotalRatings={setTotalRatings}
          setUserRating={setUserRating}
          userId="1"
          userRating={{
            previous: 2,
            current: 0
          }}
        />
      </MockedProvider>
    );
    //debug(container);
    expect(
      await screen.findByText(
        'Please update your current rate of the book A Gentleman in Moscow'
      )
    ).toBeInTheDocument();
    //this is where the previous rating of the user is showed
    //<span class="MuiRating-visuallyHidden">2 Stars</span>
    expect(screen.getByText(/2 stars/i)).toBeInTheDocument();

    //cancel button onClick
    userEvent.click(screen.getByRole('button', { name: /cancel/i }));

    await waitFor(() => {
      expect(setOpen).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(false);
      expect(setDialogState).toHaveBeenCalledTimes(1);
    });

    // save button - the user didn't select any new rating, so updateRAting will be called with the previous result of the mock query
    //Todo: still has to test: click on rating and change value , save button, response message
    userEvent.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(updateRating).toBeCalledTimes(1);
      // expect(updateRating).toBeCalledWith({
      //   variables: { ratingId: '127', rating: 2 }
      // });
    });
  });
});
