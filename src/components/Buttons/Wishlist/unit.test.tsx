import {
  renderWithTheme,
  screen,
  setHookState,
  waitFor
} from 'utils/tests/helpers';
import userEvent from '@testing-library/user-event';
import WishlistButton from '.';

import React from 'react';

//#region Mock session
jest.mock('next-auth/react', () => {
  const MOCK_FAKE_USER_ID: string = '1';
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    user: {
      id: MOCK_FAKE_USER_ID,
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY2ODcxMTEwMSwiZXhwIjoxNjcxMzAzMTAxfQ.aglUmEdH3Cu-XmT-Cox5iidI4X-Ri2nuedqRidTgVXg',
      name: 'Mock User',
      email: 'mockuser@gmail.com'
    },
    expires: '2022-12-21T14:55:42.374Z'
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' }; // return type is [] in v3 but changed to {} in v4
    })
  };
});
//#endregion

describe('<WishlistButton/>', () => {
  it('should render the wishlist button', async () => {
    //Mock useState
    const reactMock = require('react');

    reactMock.useState = setHookState({
      isFavorite: false,
      loading: false
    });

    //#region Mock useWishkist
    const useWishlist = jest.spyOn(
      require('../../../hooks/use-wishlist'),
      'useWishlist'
    );

    const isInWishlist = jest.fn(() => false); //the book is not in the wishlist
    const addToWishlist = jest.fn();
    useWishlist.mockImplementation(() => ({
      addToWishlist,
      removeFromWishlist: jest.fn(),
      isInWishlist
    }));
    //#endregion

    const { debug, container } = renderWithTheme(<WishlistButton bookId="8" />);

    debug(container);
    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    //if the book it's not a favorite(isFavorite= false) then if the user clicks
    //on the button then it should be added to the the wishlist(addToWishlist)
    await waitFor(() => {
      expect(isInWishlist).toHaveBeenCalledTimes(1);
      expect(isInWishlist).toBeCalledWith('8');
      expect(addToWishlist).toBeCalledWith('8');
    });
  });

  it('should remove item fron the wishlist', async () => {
    //Mock useState
    const reactMock = require('react');

    reactMock.useState = setHookState({
      isFavorite: true,
      loading: false
    });

    //#region Mock useWishkist
    const useWishlist = jest.spyOn(
      require('../../../hooks/use-wishlist'),
      'useWishlist'
    );

    const isInWishlist = jest.fn(() => true); //the book is in the wishlist
    const removeFromWishlist = jest.fn();
    useWishlist.mockImplementation(() => ({
      addToWishlist: jest.fn(),
      removeFromWishlist,
      isInWishlist
    }));
    //#endregion

    renderWithTheme(<WishlistButton bookId="8" />);

    expect(screen.getByRole('button')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button'));
    //if the book it's a favorite(isFavorite= true) then if the user clicks
    //on the button then it should be removed from the wishlist(removeFromWishlist)
    await waitFor(() => {
      expect(isInWishlist).toHaveBeenCalledTimes(1);
      expect(isInWishlist).toBeCalledWith('8');
      expect(removeFromWishlist).toBeCalledWith('8');
    });
  });
});
