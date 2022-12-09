import React from 'react';
import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import BaseLayout from 'templates/BaseLayout';
import { initializeApollo } from 'graphql/client/apolloClient';
import {
  BooksFiltersQuery,
  BooksFiltersQueryVariables,
  FiltersQuery,
  FiltersQueryVariables
} from 'graphql/generated/graphql';
import { BOOKS_FILTERS_QUERY } from 'graphql/queries/books';
import BooksPageTemplate from './../templates/BooksPage/index';
import { FILTERS_QUERY } from 'graphql/queries/filters';
import { parseQueryStringToFilter } from 'utils/filter';

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

  const { error: booksError } = await apolloClient.query<
    BooksFiltersQuery,
    BooksFiltersQueryVariables
  >({
    query: BOOKS_FILTERS_QUERY,
    variables: {
      page: query.page ? Number(query.page!) : 1,
      pageSize: Number(process.env.NEXT_PUBLIC_PAGE_SIZE),
      filters: parseQueryStringToFilter({ queryString: query }),
      sort: ['title']
    }
    //fetchPolicy: 'network-only'
  });

  const { data: filters, error: filtersError } = await apolloClient.query<
    FiltersQuery,
    FiltersQueryVariables
  >({ query: FILTERS_QUERY });

  if (filtersError || booksError) {
    return {
      redirect: {
        destination: `/error`,
        permanent: false
      }
    };
  }

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(), //extract cache and send to the client
      filters
    }
  };
};
