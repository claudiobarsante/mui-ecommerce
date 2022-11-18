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

  // useEffect(() => {

  //   setIsFavorite(()=> isInWishlist(bookId))
  // }, [input])
  const handleOnClick = () => {
    console.log('passei handleOnClick');
    setLoading(true);
    isInWishlist(bookId) ? removeFromWishlist(bookId) : addToWishlist(bookId);
    // setIsFavorite((previous) => {
    //   if (previous === 0) return 1;
    //   return 0;
    // });
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
