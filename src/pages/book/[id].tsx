import { GetStaticProps } from 'next';
// --  Apollo
import { initializeApollo } from 'graphql/client/apolloClient';
import { BookQuery, FeaturedQuery } from 'graphql/generated/graphql';
import { BOOK_QUERY, FEATURED_QUERY } from 'graphql/queries/books';
// -- Templates
import BookPageTemplate from 'templates/BookPage/index';
// -- Utils
import { bookMapper, BookProps } from 'utils/mappers';
import ErrorBoundary from 'components/ErrorBoundary';

const apolloClient = initializeApollo();

export type Props = {
  book: BookProps;
};

export default function Index({ book }: Props) {
  return (
    <ErrorBoundary>
      <BookPageTemplate book={book} />
    </ErrorBoundary>
  );
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

  if (error) {
    return {
      redirect: {
        destination: `/error`,
        permanent: false
      }
    };
  }

  return {
    props: {
      book: bookMapper(data)
    }
  };
};
