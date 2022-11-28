import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import React from 'react';
import BaseLayout from 'templates/BaseLayout';
import { initializeApollo } from 'graphql/client/apolloClient';
import {
  BooksFiltersQuery,
  BooksFiltersQueryVariables
} from 'graphql/generated/graphql';
import { BOOKS_FILTERS_QUERY } from 'graphql/queries/books';
import BooksPageTemplate from './../templates/BooksPage/index';

const Books = () => {
  return (
    <BaseLayout>
      <BooksPageTemplate />
    </BaseLayout>
  );
};

export default Books;

export const getServerSideProps: GetServerSideProps = async ({
  query
}: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo();
  const { data, error } = await apolloClient.query<
    BooksFiltersQuery,
    BooksFiltersQueryVariables
  >({
    query: BOOKS_FILTERS_QUERY,
    variables: {
      page: 1,
      pageSize: 3,
      filters: {},
      sort: ['title']
    }
  });

  console.log('data-books', data);
  return {
    props: {
      books: {},
      filters: {}
    }
  };
};
