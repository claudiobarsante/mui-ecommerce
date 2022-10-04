import { GetStaticPaths, GetStaticProps } from 'next';
// --  Apollo
import { initializeApollo } from 'graphql/apolloClient';
import { BookQuery, FeaturedQuery } from 'graphql/generated/graphql';
import { BOOK_QUERY, FEATURED_QUERY } from 'graphql/queries/books';
const apolloClient = initializeApollo();

export default function Index() {
  return <p>Id</p>;
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query<FeaturedQuery>({
    query: FEATURED_QUERY
  });

  const paths = data.books?.data.map((book) => ({ params: { id: book.id } }));

  return { paths, fallback: 'blocking' };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log('params', params);
  const { data, error } = await apolloClient.query<BookQuery>({
    query: BOOK_QUERY,
    variables: {
      id: params?.id
    }
  });
  console.log('result', data);

  return {
    props: {}
  };
};
