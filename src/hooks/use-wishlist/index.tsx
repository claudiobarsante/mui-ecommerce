import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useSession } from 'next-auth/react';
import { useMutation, useQuery } from '@apollo/client';
// -- Query
import { WISHLISTS_QUERY } from 'graphql/queries/wishlist';
// -- Mutations
import {
  CREATE_WISHLIST_MUTATION,
  UPDATE_WISHLIST_MUTATION
} from 'graphql/mutations/wishlist';
// -- Mappers
import { BookProps, bookToWishlistMapper } from 'utils/mappers';

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
    if (data?.wishlists?.data?.length > 0 && isAuthenticated) {
      let favorites: BookProps[] = [];
      const returnedDataLength =
        data.wishlists.data[0].attributes.books.data.length;
      for (let i = 0; i < returnedDataLength; i++) {
        const items = bookToWishlistMapper(
          data.wishlists.data[0].attributes.books.data[i]
        ) as BookProps;

        favorites.push(items);
      }

      setWishlistItems((previous) => [...previous, ...favorites]);
      setWishlistId(data.wishlists.data[0].id);
    }
  }, [data?.wishlists?.data, isAuthenticated]);

  //#region Mutations
  const [createWishlist] = useMutation(CREATE_WISHLIST_MUTATION, {
    context: { session },
    onCompleted: (data) => {
      const items = bookToWishlistMapper(
        data.createWishlist.data.attributes.books.data[0]
      ) as BookProps;
      setWishlistItems([items]);
      setWishlistId(data.createWishlist.data.id);
    }
  });

  const [updateWishlist] = useMutation(UPDATE_WISHLIST_MUTATION, {
    context: { session },
    onCompleted: (data) => {
      const updated: BookProps[] = [];
      const returnedDataLength =
        data.updateWishlist.data.attributes.books.data.length;
      for (let i = 0; i < returnedDataLength; i++) {
        const items = bookToWishlistMapper(
          data.updateWishlist.data.attributes.books.data[i]
        ) as BookProps;
        updated.push(items);
      }
      setWishlistItems(updated);
    }
  });
  //#endregion

  const isInWishlist = useCallback(
    (bookId: string) => {
      const found = wishlistItems.find((book) => book.id === bookId);
      return !!found;
    },
    [wishlistItems]
  );

  const wishlistBooksIds = useMemo(
    () => wishlistItems.map((book) => book.id),
    [wishlistItems]
  );

  const addToWishlist = useCallback(
    (bookId: string) => {
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
    },
    [
      createWishlist,
      session?.user.id,
      updateWishlist,
      wishlistBooksIds,
      wishlistId
    ]
  );

  const removeFromWishlist = useCallback(
    (bookId: string) => {
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
    },
    [session?.user.id, updateWishlist, wishlistBooksIds, wishlistId]
  );

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
