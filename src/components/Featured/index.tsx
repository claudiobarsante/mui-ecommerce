import { Container, Grid } from '@mui/material';
import useIsMobile from 'hooks/use-IsMobile';
import { products } from '../../data';
import SingleBookMobile from 'components/Book/Mobile';

import SingleBookDesktop from 'components/Book/Desktop';

export type FeaturedBook = {
  __typename: string;
  id: string;
  attributes: {
    __typename: string;
    title: string;
    price: number;
    coverImageUrl: string;
    rating: number;
  };
};

export type FeaturedProps = {
  featured: FeaturedBook[];
};

export default function Featured({ featured }: FeaturedProps) {
  const isMobile = useIsMobile();

  const renderBooks = featured.map((book) => (
    <Grid
      item
      key={book.id}
      xs={2}
      sm={3}
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      alignItems="center"
      padding={'10px'}
    >
      {isMobile ? (
        <SingleBookMobile book={book} isMobile={isMobile} />
      ) : (
        <SingleBookDesktop book={book} isMobile={isMobile} />
      )}
    </Grid>
  ));
  return (
    <Container>
      <Grid
        container
        spacing={{ xs: 2, md: 1 }}
        justifyContent="center"
        sx={{ margin: `20px 4px 10px 4px` }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {renderBooks}
      </Grid>
    </Container>
  );
}
