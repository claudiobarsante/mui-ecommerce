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

import { BookSummary } from 'components/Books';
import WishlistButton from 'components/Buttons/Wishlist';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
// -- Utils
import { shimmer, toBase64 } from './../../../utils/shared/shimmer';

type Props = {
  book: BookSummary;
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

  return (
    <>
      {/* <Paper elevation={3} sx={{ overflow: 'hidden' }}> */}
      <S.Book onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <S.TitleContainer>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 500 }}>
            {book.attributes.title}
          </Typography>
        </S.TitleContainer>
        <S.BookImage>
          <Image
            src={book.attributes.coverImageUrl}
            // blurDataURL={`data:image/svg+xml;base64,${toBase64(
            //   shimmer(700, 475)
            // )}`}
            // placeholder="blur"
            alt={book.attributes.title}
            layout="fill"
            quality={100}
            priority
            aria-label={book.attributes.title}
          />
        </S.BookImage>
        <WishlistButton bookId={book.id} />
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
        <ProductInfo book={book} />
      </S.Book>
      {/* </Paper> */}
    </>
  );
}
