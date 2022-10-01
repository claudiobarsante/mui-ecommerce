import * as React from 'react';

// --  Apollo
import { initializeApollo } from 'graphql/apolloClient';
// -- Types
import type { GetStaticProps, NextPage } from 'next';
import { FEATURED_QUERY } from 'graphql/queries/books';
// -- Custom components
import BaseLayout from 'templates/BaseLayout';
import HeroBanner from 'components/HeroBanner';
import PromotionsSlider from 'components/PromotionsSlider';
import { Box, Typography } from '@mui/material';
import { FeaturedQuery } from 'graphql/generated/graphql';
import Featured, { FeaturedProps } from 'components/Featured';

const Home = ({ featured }: FeaturedProps) => {
  return (
    <BaseLayout>
      <HeroBanner />
      <PromotionsSlider />
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h4">Featured</Typography>
      </Box>
      <Featured featured={featured} />
    </BaseLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data, error } = await apolloClient.query<FeaturedQuery>({
    query: FEATURED_QUERY
  });

  if (error) {
    return {
      redirect: {
        destination: `/error`,
        permanent: false
      }
    };
  }
  console.log('data', data?.books?.data);
  return {
    revalidate: 60 * 60 * 24, //24 hours - revalidate is in seconds, so 60sec * 60 min * 24 hours
    props: {
      initialApolloState: apolloClient.cache.extract(),
      featured: data?.books?.data
    }
  };
};
