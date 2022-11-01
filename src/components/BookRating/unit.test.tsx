import { act, waitFor, screen, renderWithTheme } from 'utils/tests/helpers';
import { useState } from 'react';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';
import BookRating, { DialogState } from 'components/BookRating';
// -- Query
import { RATINGS_QUERY } from 'graphql/queries/ratings';
import React from 'react';
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

  it('should render <BookRating/> for update', async () => {
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
        <BookRating
          bookTitle={'A Gentleman in Moscow'}
          userId={'1'}
          bookId={'8'}
          open={true}
          setOpen={setOpen}
          setRating={setRating}
          setTotalRatings={setTotalRatings}
        />
      </MockedProvider>
    );
    //debug(container);
    expect(
      await screen.findByText(
        /ate your current rate of the book A Gentleman in Moscow/i
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
    });

    // save button - the user didn't select any new rating, so updateRAting will be called with the previous result of the mock query
    act(() => {
      userEvent.click(screen.getByRole('button', { name: /save/i }));
    });

    waitFor(() => {
      expect(updateRating).toBeCalledTimes(1);
      expect(updateRating).toBeCalledWith({
        variables: { ratingId: '127', rating: 2 }
      });
    });
  });
});
