import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
// -- Custom hooks
import { useWishlist } from 'hooks/use-wishlist';
// -- Material
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Tooltip } from '@mui/material';
// -- Custom components
import Spinner from 'components/Spinner';
// -- Styles
import * as S from './styles';

type Props = {
  bookId: string;
};
const WishlistButton = ({ bookId }: Props) => {
  const { status } = useSession();
  const [isFavorite, setIsFavorite] = React.useState(false); // To enable us to mock useState, we use React.useState
  const [loading, setLoading] = React.useState(false);

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
      {loading ? (
        <Spinner />
      ) : (
        <Tooltip
          placement="left"
          title={isFavorite ? 'remove from my wishlist' : 'add to my wishlist'}
        >
          <FavoriteIcon />
        </Tooltip>
      )}
    </S.FavButton>
  );
};

export default WishlistButton;
