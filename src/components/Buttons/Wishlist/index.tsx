import { Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import * as S from './styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useWishlist } from 'hooks/use-wishlist';
import { useSession } from 'next-auth/react';

type Props = {
  bookId: string;
};
const WishlistButton = ({ bookId }: Props) => {
  const { status } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    setIsFavorite(() => isInWishlist(bookId));
  }, [bookId, isInWishlist]);

  const handleOnClick = () => {
    setLoading(true);
    isInWishlist(bookId) ? removeFromWishlist(bookId) : addToWishlist(bookId);
    setIsFavorite((previous) => !previous);
    setLoading(false);
  };

  if (status === 'unauthenticated') return null;

  return (
    <S.FavButton isfav={isFavorite.toString()} onClick={handleOnClick}>
      <Tooltip placement="left" title="add to my wishlist">
        <FavoriteIcon />
      </Tooltip>
    </S.FavButton>
  );
};

export default WishlistButton;