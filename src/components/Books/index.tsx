import { Container, Grid } from '@mui/material';
import Book from 'components/Book';

export type BookSummary = {
  __typename: string;
  id: string;
  attributes: {
    __typename: string;
    title: string;
    price: number;
    coverImageUrl: string;
    rating: number;
    calculatedRating: number;
  };
};

export type BooksProps = {
  books: BookSummary[];
};

export default function Books({ books }: BooksProps) {
  if (!books) return null;
  const renderBooks = books.map((book) => (
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
      <Book book={book} />
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
