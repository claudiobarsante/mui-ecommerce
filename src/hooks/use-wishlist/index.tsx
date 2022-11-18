import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { BookProps } from 'utils/mappers';
import { useMutation, useQuery } from '@apollo/client';
import { WISHLISTS_QUERY } from 'graphql/queries/wishlist';

export type WishlistContextData = {
  items: BookProps[];
  isInWishlist: (userId: string, bookId: string) => boolean;
  addToWishlist: (userId: string, bookId: string) => void;
  removeFromWishlist: (userId: string, bookId: string) => void;
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

  const { data } = useQuery(WISHLISTS_QUERY, {
    skip: !isAuthenticated, //can't run the query if there's no authenticated user
    context: { session },
    variables: {
      userId: session?.user.id
    }
  });

  return (
    <WishlistContext.Provider value={{}}>{children}</WishlistContext.Provider>
  );
};
const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
