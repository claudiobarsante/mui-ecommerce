import React, { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  Chip,
  IconButton,
  DialogContent,
  Typography,
  Button,
  Stack,
  Rating,
  DialogContentText,
  TextField,
  DialogActions
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
import FaceIcon from '@mui/icons-material/Face';
import useIsMobile from 'hooks/use-IsMobile';
import { BookProps } from 'utils/mappers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import * as S from './styles';
import Availability from 'components/Availability';

import BookRating from 'components/BookRating';

type Props = {
  book: BookProps;
};

const BookPageTemplate = ({ book }: Props) => {
  const [rating, setRating] = useState(book.rating || 0);
  const [open, setOpen] = useState(false);
  const [totalRatings, setTotalRatings] = useState(book.totalRatings || 0);

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
          <Typography sx={{ lineHeight: 2 }} variant="h4">
            {book.title}
          </Typography>
          <Typography variant="subtitle1">SKU: {book.bookId}</Typography>
          <Availability qty={book.stock} />
          <Box
            onClick={() => setOpen(true)}
            sx={{
              '&:hover': {
                cursor: 'pointer'
              },
              display: 'flex',
              justifyContent: 'flex-start',
              alignItens: 'center'
            }}
          >
            <Rating
              name="current-book-rating"
              value={rating}
              precision={0.1}
              readOnly
              sx={{ color: Colors.warning }}
            />
            <Typography variant="subtitle1" sx={{ marginLeft: 3 }}>
              {' '}
              based on {totalRatings} user ratings
            </Typography>
          </Box>
          <BookRating
            bookTitle={book.title}
            userId="1"
            bookId={book.id}
            open={open}
            setOpen={setOpen}
            setRating={setRating}
            setTotalRatings={setTotalRatings}
          />

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
