import React from 'react';

const WishlistButton = () => {
  return (
    <S.FavButton isfav={0}>
      <Tooltip placement="left" title="add to my wishlist">
        <FavoriteIcon />
      </Tooltip>
    </S.FavButton>
  );
};

export default WishlistButton;
