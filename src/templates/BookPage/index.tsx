import React, { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useLazyQuery } from '@apollo/client';
import { Box, Button, Rating, Typography } from '@mui/material';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
// -- Templates
import BaseLayout from 'templates/BaseLayout';
// --Styles
import * as S from './styles';
import { Colors } from 'styles/theme/colors';
import { Book } from 'components/Book/styles';
// -- Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
// -- Custom components
import Availability from 'components/Availability';
import BookRatingModal from 'components/BookRatingModal';
// -- Querys
import { RATINGS_QUERY } from 'graphql/queries/ratings';
// -- Custom hooks
import useIsMobile from 'hooks/use-IsMobile';
// -- Utils
import { BookProps } from 'utils/mappers';

//
type Props = {
  book: BookProps;
};

const BookPageTemplate = ({ book }: Props) => {
  //
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const { push } = useRouter();

  const isMobile = useIsMobile();

  //todo: check why after user logged in, the page is not redirect back. It's redirecting to the home page
  const handleRatingClick = () => {
    //only logged in users can rate
    if (!session?.user.id) {
      push('/sign-in');
      return;
    }
    setOpenModal(true);
  };

  return (
    <BaseLayout>
      <NextSeo
        title={`${book.title} - Book Store`}
        description={book.synopsis} // use a small description
        canonical={`https://wwww.bookstore.com/book/${book.id}`}
        //Facebook, Linkedin, Twitter...
        openGraph={{
          url: `https://wwww.bookstore.com/book/${book.id}`,
          title: `${book.title} - Book Store`,
          description: book.synopsis,
          images: [
            {
              url: `${book.coverImageUrl}`,
              alt: `${book.title}`
            }
          ]
        }}
        // --
      />
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
          <Typography variant="subtitle1">SKU: {book.sku}</Typography>
          <Availability qty={book.stock} />
          <Box
            onClick={handleRatingClick}
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
              value={book.calculatedRating}
              precision={0.1}
              readOnly
              sx={{ color: Colors.warning }}
            />

            <Typography variant="subtitle1" sx={{ marginLeft: 3 }}>
              {' '}
              {book.totalRatings === 0
                ? 'Be the first to rate this book'
                : `Based on ${book.totalRatings} user ratings`}
            </Typography>
          </Box>
          <BookRatingModal
            bookId={book.id}
            open={openModal}
            userId={session?.user.id}
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
