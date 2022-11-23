import { MockedProvider } from '@apollo/client/testing';
import { renderHook } from '@testing-library/react-hooks';
import { useWishlist, WishlistProvider, WishlistProviderProps } from '.';

import { act, waitFor } from 'utils/tests/test-utils';
import {
  createWishlistMock,
  removeWishlistMock,
  updateWishlistMock,
  wishlistItems,
  wishlistMock
} from './mock';

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

describe('useWishlist', () => {
  it('should return wishlist items', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    // wait until get the data
    await waitForNextUpdate();

    expect(result.current.items).toStrictEqual([
      wishlistItems[0],
      wishlistItems[1]
    ]);
  });

  it('should check if the game is in the wishlist', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    // wait for the data to load
    await waitForNextUpdate();

    expect(result.current.isInWishlist('1')).toBe(false);
    expect(result.current.isInWishlist('2')).toBe(true);
    expect(result.current.isInWishlist('3')).toBe(true);
  });

  it('should create a new wishlist with one item', async () => {
    const MOCK_BOOK_ID = '8';
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[createWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    act(() => {
      result.current.addToWishlist(MOCK_BOOK_ID);
    });

    // wait for the data to load
    await waitForNextUpdate();
    expect(result.current.items).toStrictEqual([wishlistItems[2]]);
  });

  it('should add item in wishlist updating the current list', async () => {
    const MOCK_BOOK_ID: string = '8';
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock, updateWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    // wait for the data to load
    await waitForNextUpdate();

    act(() => {
      result.current.addToWishlist(MOCK_BOOK_ID);
    });

    await waitFor(() => {
      expect(result.current.items).toStrictEqual(wishlistItems);
    });
  });

  it('should remove item from wishlist', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MockedProvider mocks={[wishlistMock, removeWishlistMock]}>
        <WishlistProvider>{children}</WishlistProvider>
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useWishlist(), {
      wrapper
    });

    // wait for the data to load
    await waitForNextUpdate();
    act(() => {
      result.current.removeFromWishlist('3');
    });

    await waitFor(() => {
      expect(result.current.items).toStrictEqual([wishlistItems[0]]);
    });
  });
});
