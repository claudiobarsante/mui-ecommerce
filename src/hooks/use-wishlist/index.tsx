import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { bookMapper, BookProps } from 'utils/mappers';
import { useMutation, useQuery } from '@apollo/client';
import { WISHLISTS_QUERY } from 'graphql/queries/wishlist';
import {
  CREATE_WISHLIST_MUTATION,
  UPDATE_WISHLIST_MUTATION
} from 'graphql/mutations/wishlist';

export type WishlistContextData = {
  items: BookProps[];
  isInWishlist: (bookId: string) => boolean;
  addToWishlist: (bookId: string) => void;
  removeFromWishlist: (bookId: string) => void;
};

const defaultValues = {
  items: [],
  isInWishlist: () => false,
  addToWishlist: () => null,
  removeFromWishlist: () => null
};

export const WishlistContext =
  createContext<WishlistContextData>(defaultValues);

export type WishlistProviderProps = {
  children: React.ReactNode;
};
const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const { data: session, status } = useSession();
  const [wishlistId, setWishlistId] = useState<string | null>();
  const [wishlistItems, setWishlistItems] = useState<BookProps[]>([]);

  const isAuthenticated = status === 'authenticated' ? true : false;
  // -- Query
  const { data } = useQuery(WISHLISTS_QUERY, {
    skip: !isAuthenticated, //can't run the query if there's no authenticated user
    context: { session },
    variables: {
      userId: session?.user.id
    }
  });

  useEffect(() => {
    if (data.wishlists.data.length > 0) {
      const items = bookMapper(data.wishlists.data[0].books) as BookProps[];
      setWishlistItems(items);
      setWishlistId(data.wishlists.data[0].id);
    }
  }, [data.wishlists.data]);

  //#region Mutations
  const [createWishlist] = useMutation(CREATE_WISHLIST_MUTATION, {
    context: { session },
    onCompleted: (data) => {
      const items = bookMapper(data.wishlists.data[0].books) as BookProps[];
      setWishlistItems(items);
      setWishlistId(data.wishlists.data[0].id);
    }
  });
  const [updateWishlist] = useMutation(UPDATE_WISHLIST_MUTATION, {
    context: { session },
    onCompleted: (data) => {
      const items = bookMapper(data.wishlists.data[0].books) as BookProps[];
      setWishlistItems(items);
    }
  });
  //#endregion

  const isInWishlist = (bookId: string) =>
    !!wishlistItems.find((book) => book.id === bookId);

  const wishlistBooksIds = useMemo(
    () => wishlistItems.map((book) => book.id),
    [wishlistItems]
  );

  const addToWishlist = (bookId: string) => {
    //*if the wishlist exists, update it
    if (wishlistId) {
      return updateWishlist({
        variables: {
          id: wishlistId,
          data: {
            user: session?.user.id,
            books: [...wishlistBooksIds, bookId]
          }
        }
      });
    }
    //*if the wishlist doesn't exist, create it
    return createWishlist({
      variables: {
        data: {
          user: session?.user.id,
          books: [bookId]
        }
      }
    });
  };

  const removeFromWishlist = (bookId: string) => {
    const updatedWishlistBooksIds = wishlistBooksIds.filter(
      (id) => id !== bookId
    );
    return updateWishlist({
      variables: {
        id: wishlistId,
        data: {
          user: session?.user.id,
          books: updatedWishlistBooksIds
        }
      }
    });
  };

  return (
    <WishlistContext.Provider
      value={{
        items: wishlistItems,
        isInWishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
