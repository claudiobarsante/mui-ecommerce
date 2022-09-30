import * as React from 'react';

// --  Apollo
import { initializeApollo } from 'graphql/apolloClient';
// -- Types
import type { GetStaticProps, NextPage } from 'next';
import { BOOKS_QUERY } from 'graphql/queries/books';
// -- Custom components
import BaseLayout from 'templates/BaseLayout';

const Home: NextPage = () => {
  return (
    <BaseLayout>
      <p>Estou na index</p>
    </BaseLayout>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  console.log('passei');
  const apolloClient = initializeApollo();
  const { data, error, loading } = await apolloClient.query<any>({
    query: BOOKS_QUERY
  });

  console.log(JSON.stringify(data.books.data));
  return {
    props: {}
  };
};
