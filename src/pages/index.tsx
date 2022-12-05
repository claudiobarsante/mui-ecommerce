import * as React from 'react';
import type { GetStaticProps } from 'next';

// --  Apollo
import { initializeApollo } from 'graphql/client/apolloClient';
// -- Types
import { FEATURED_QUERY } from 'graphql/queries/books';
import { FeaturedQuery } from 'graphql/generated/graphql';
// -- Custom components
import { BooksProps } from 'components/Books';
import HomeTemplate from 'templates/Home';

const Home = ({ books }: BooksProps) => {
  return <HomeTemplate books={books} />;
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data, error } = await apolloClient.query<FeaturedQuery>({
    query: FEATURED_QUERY,
    fetchPolicy: 'no-cache'
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
    revalidate: 60 * 60 * 24, //24 hours - revalidate is in seconds, so 60sec * 60 min * 24 hours
    props: {
      initialApolloState: apolloClient.cache.extract(),
      books: data?.books?.data
    }
  };
};
