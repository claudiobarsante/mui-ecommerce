import * as React from 'react';
import type { GetStaticProps } from 'next';

// --  Apollo
import { initializeApollo } from 'graphql/client/apolloClient';
// -- Types
import { FEATURED_QUERY } from 'graphql/queries/books';
import { FeaturedQuery } from 'graphql/generated/graphql';
// -- Custom components
import { FeaturedProps } from 'components/Featured';
import HomeTemplate from 'templates/Home';

const Home = ({ featured }: FeaturedProps) => {
  return <HomeTemplate featured={featured} />;
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
      featured: data?.books?.data
    }
  };
};
