import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';

import * as S from './styles';
import Filters from './../../components/Filters/index';

import { BooksProps } from 'pages/books';
import {
  BooksFiltersQuery,
  BooksFiltersQueryVariables
} from 'graphql/generated/graphql';
import { BOOKS_FILTERS_QUERY } from 'graphql/queries/books';

export type FilterData = {
  [key: string]: string[] | [];
};
const BooksPageTemplate = ({ filters }: BooksProps) => {
  const [filterData, setFilterData] = useState<FilterData>({ authors: [] });

  const { data, error } = useQuery<
    BooksFiltersQuery,
    BooksFiltersQueryVariables
  >(BOOKS_FILTERS_QUERY, {
    variables: {
      page: 1,
      pageSize: 3,
      filters: {},
      sort: ['title']
    }
  });
  return (
    <S.PageContainer>
      <S.FiltersContainer>
        <Filters filters={filters} setFilterData={setFilterData} />
        {JSON.stringify(filterData)}
      </S.FiltersContainer>
      <S.SearchContainer component="section">
        <p>Search</p>
      </S.SearchContainer>
      <S.BooksContainer component="section">
        <p>Books</p>
      </S.BooksContainer>
      <S.PaginationContainer component="section">
        <p>Pagination</p>
      </S.PaginationContainer>
    </S.PageContainer>
  );
};

export default BooksPageTemplate;
