import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import React from 'react';
import BaseLayout from 'templates/BaseLayout';
import { initializeApollo } from 'graphql/client/apolloClient';
import {
  BooksFiltersQuery,
  BooksFiltersQueryVariables,
  FiltersQuery,
  FiltersQueryResult,
  FiltersQueryVariables
} from 'graphql/generated/graphql';
import { BOOKS_FILTERS_QUERY } from 'graphql/queries/books';
import BooksPageTemplate from './../templates/BooksPage/index';
import { FILTERS_QUERY } from 'graphql/queries/filters';

export type BooksProps = {
  filters: FiltersQuery;
};
const Books = ({ filters }: BooksProps) => {
  return (
    <BaseLayout>
      <BooksPageTemplate filters={filters} />
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

  const { data: filters } = await apolloClient.query<
    FiltersQuery,
    FiltersQueryVariables
  >({ query: FILTERS_QUERY });

  console.log('data-books', data);
  return {
    props: {
      books: {},
      filters
    }
  };
};
