import { createContext, useContext, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { BookProps } from 'utils/mappers';

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

  return (
    <WishlistContext.Provider value={{}}>{children}</WishlistContext.Provider>
  );
};
const useWishlist = () => useContext(WishlistContext);

export { WishlistProvider, useWishlist };
