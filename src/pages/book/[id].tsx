import { GetStaticProps } from 'next';
// --  Apollo
import { initializeApollo } from 'graphql/apolloClient';
import { BookQuery, FeaturedQuery } from 'graphql/generated/graphql';
import { BOOK_QUERY, FEATURED_QUERY } from 'graphql/queries/books';
// -- Templates
import BookPageTemplate from 'templates/BookPageTemplate/index';
import { bookMapper, BookProps } from 'utils/mappers';

const apolloClient = initializeApollo();

export type Props = {
  book: BookProps;
};

export default function Index({ book }: Props) {
  return <BookPageTemplate book={book} />;
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<FeaturedQuery>({
    query: FEATURED_QUERY
  });

  const paths = data.books?.data.map((book) => ({ params: { id: book.id } }));

  return { paths, fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data, error } = await apolloClient.query<BookQuery>({
    query: BOOK_QUERY,
    variables: {
      id: params?.id
    }
  });

  //Todo: if there's an error, send it to error page

  return {
    props: {
      book: bookMapper(data)
    }
  };
};
