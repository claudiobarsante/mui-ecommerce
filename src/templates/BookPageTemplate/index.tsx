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

const BookDetailWrapper = styled(Box)(({ theme }) => ({
  display: 'flex'
  // padding: theme.spacing(4)
}));

const BookDetailInfoWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 500,
  lineHeight: 1.5
}));

const BookImage = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  width: '100%',
  //background: Colors.light_gray,
  padding: '10px'
  // [theme.breakpoints.down("md")]: {
  //   width: "80%",
  //   padding: '24px',
  // },
}));

type Props = {
  book: BookProps;
};

const BookPageTemplate = ({ book }: Props) => {
  console.log('bookTemplate', book);
  const isMobile = useIsMobile();

  return (
    <BaseLayout>
      <BookDetailWrapper
        display={'flex'}
        flexDirection={isMobile ? 'column' : 'row'}
      >
        <Book sx={{ mr: 4 }}>
          <BookImage src={book.coverImageUrl!} />
        </Book>
        <BookDetailInfoWrapper>
          <Typography variant="subtitle1">SKU: 123</Typography>
          <Typography variant="subtitle1">Availability: 5 in stock</Typography>
          <Typography sx={{ lineHeight: 2 }} variant="h4">
            {book.title}
          </Typography>
          <Typography variant="body1">
            {'asdasdasdasdasdsad'}
            {'asdasdasdasdasdsad'}
            {'asdasdasdasdasdsad'}
          </Typography>
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
        </BookDetailInfoWrapper>
      </BookDetailWrapper>
    </BaseLayout>
  );
};

export default BookPageTemplate;
