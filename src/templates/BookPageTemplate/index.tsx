import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
  Stack
} from '@mui/material';
import BaseLayout from 'templates/BaseLayout';
import { Colors } from 'styles/theme/colors';
import styled from '@emotion/styled';
import { AddToCartButton, Book } from 'components/Book/styles';
import { BannerShopButton } from 'components/HeroBanner/styles';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FavoriteIcon from '@mui/icons-material/Favorite';

import useIsMobile from 'hooks/use-IsMobile';
import { BookProps } from 'utils/mappers';

import * as S from './styles';

type Props = {
  book: BookProps;
};

const BookPageTemplate = ({ book }: Props) => {
  console.log('bookTemplate', book);
  const isMobile = useIsMobile();

  return (
    <BaseLayout>
      <S.BookDetailContainer
        display={'flex'}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Book sx={{ mr: 4 }}>
          <S.BookImage src={book.coverImageUrl!} />
        </Book>
        <S.BookDetailInfoContainer>
          <Typography variant="subtitle1">SKU: {book.bookId}</Typography>
          <Typography variant="subtitle1">Availability: 5 in stock</Typography>
          <Typography sx={{ lineHeight: 2 }} variant="h4">
            {book.title}
          </Typography>
          <Typography variant="body1">{book.synopsis}</Typography>
          <Box
            sx={{ mt: 4 }}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button variant="contained">Add to Cart</Button>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{ mt: 4, color: Colors.light }}
          >
            <FavoriteIcon sx={{ mr: 2 }} />
            Add to wishlist
          </Box>
          <Box
            sx={{
              mt: 4,
              color: Colors.dove_gray
            }}
          >
            <FacebookIcon />
            <TwitterIcon sx={{ pl: 2 }} />
            <InstagramIcon sx={{ pl: 2 }} />
          </Box>
        </S.BookDetailInfoContainer>
      </S.BookDetailContainer>
    </BaseLayout>
  );
};

export default BookPageTemplate;
