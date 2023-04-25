import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// -- Card
import Card from '@mui/material/Card';

import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Rating, Grid } from '@mui/material';

import { BookSummary } from 'components/Books';
import WishlistButton from 'components/Buttons/Wishlist';

import formatPrice from 'utils/shared/format-price';
import { Colors } from 'styles/theme/colors';

type Props = {
  book: BookSummary;
  isMobile: boolean;
};
export default function SingleBookDesktop({ book }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  //?-- to avoid hydration error with <WishlistButton />
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  //?--
  return (
    <>
      <Card sx={{ width: '14rem' }}>
        <CardActionArea>
          <CardMedia
            sx={{ height: '15rem', position: 'relative' }}
            onClick={() => router.push(`/book/${book.id}`)}
          >
            <Image
              src={book.attributes.coverImageUrl}
              alt={book.attributes.title}
              layout="fill"
              quality={100}
              priority
              aria-label={book.attributes.title}
            />
          </CardMedia>
        </CardActionArea>
        <Box sx={{ flexGrow: 1, marginTop: '1rem' }}>
          <Grid container rowSpacing={1}>
            <Grid
              aria-label={`book name: ${book.attributes.title}`}
              item
              md={8}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: '2', //--max 2 lines
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',

                  fontWeight: 600,
                  height: '3.2rem',
                  paddingLeft: '0.5rem'
                }}
              >
                {book.attributes.title}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Box sx={{ position: 'relative' }}>
                <WishlistButton
                  bookId={book.id}
                  aria-label="add to favorites"
                  sx={{
                    position: 'absolute',
                    top: -8,
                    right: 0
                  }}
                />
              </Box>
            </Grid>
            <Grid
              aria-label={`book price: ${formatPrice(book.attributes.price)}`}
              item
              md={8}
              display="flex"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Typography variant="subtitle1" sx={{ paddingLeft: '0.5rem' }}>
                {formatPrice(book.attributes.price)}
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Box sx={{ position: 'relative' }}>
                <Rating
                  size="small"
                  name="read-only"
                  value={4}
                  readOnly
                  sx={{ color: Colors.warning, right: '1.3rem' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <CardActions>
          <Button
            variant="contained"
            sx={{
              width: '100%',
              color: 'whitesmoke',
              borderRadius: 0,
              background: Colors.primary
            }}
          >
            Add To Cart
          </Button>
          {/* <Button>
            <CartPlus />
            Add to Card
          </Button>
          <WishlistButton bookId={book.id} aria-label="add to favorites" /> */}

          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
        </CardActions>
      </Card>

      {/* <S.BookImage>
          
        </S.BookImage>
        <S.TitleContainer>
          <Typography variant="subtitle1" noWrap sx={{ fontWeight: 500 }}>
            {book.attributes.title}
          </Typography>
        </S.TitleContainer> */}
      {/* <WishlistButton bookId={book.id} /> */}
      {/* {(showOptions || isMobile) && (
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
        <ProductInfo book={book} /> */}
      {/*} </S.Book>*/}
      {/* </Paper> */}
    </>
  );
}
