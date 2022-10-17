import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as S from '../styles';

import { Stack, Tooltip, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import FitScreenIcon from '@mui/icons-material/FitScreen';
//import useDialogModal from '../../hooks/useDialogModal';
//import ProductDetail from '../productdetail';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ProductInfo from '../Info';

import { FeaturedBook } from 'components/Featured';

type Props = {
  book: FeaturedBook;
  isMobile: boolean;
};
export default function SingleBookDesktop({ book, isMobile }: Props) {
  //   const [ProductDetailDialog, showProductDetailDialog, closeProductDialog] =
  //     useDialogModal(ProductDetail);
  const router = useRouter();

  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setShowOptions(true);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setShowOptions(false);
  }, []);

  console.log('isMobile: ', isMobile, showOptions);
  return (
    <>
      <S.Book onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* <S.ProductImage src={book.attributes.coverImageUrl} /> */}
        <S.BookImage>
          <Image
            src={book.attributes.coverImageUrl}
            alt={book.attributes.title}
            width={500}
            height={650}
            aria-label={book.attributes.title}
          />
        </S.BookImage>
        <S.FavButton isfav={0}>
          <Tooltip placement="left" title="add to my wishlist">
            <FavoriteIcon />
          </Tooltip>
        </S.FavButton>
        {(showOptions || isMobile) && (
          <S.AddToCartButton istoshow={`${showOptions}`} variant="contained">
            Add to cart
          </S.AddToCartButton>
        )}
        <S.ActionsButtonsContainer istoshow={showOptions.toString()}>
          <Stack direction={isMobile ? 'row' : 'column'}>
            <S.ActionButton>
              <Tooltip placement="left" title="share this product">
                <ShareIcon color="primary" />
              </Tooltip>
            </S.ActionButton>
            <S.ActionButton onClick={() => router.push(`/book/${book.id}`)}>
              <Tooltip placement="left" title="see details">
                <VisibilityIcon color="primary" />
              </Tooltip>
            </S.ActionButton>
          </Stack>
        </S.ActionsButtonsContainer>
      </S.Book>
      <ProductInfo book={book} />
      {/* <ProductDetailDialog product={product} /> */}
    </>
  );
}
