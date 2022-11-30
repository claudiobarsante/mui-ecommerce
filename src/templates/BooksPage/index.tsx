import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { ParsedUrlQueryInput } from 'querystring';
import { useLazyQuery } from '@apollo/client';
import * as S from './styles';
import Filters from './../../components/Filters/index';

import { BooksProps } from 'pages/books';
import {
  BooksFiltersQuery,
  BooksFiltersQueryVariables
} from 'graphql/generated/graphql';
import { BOOKS_FILTERS_QUERY } from 'graphql/queries/books';
import { parseQueryStringToFilter } from 'utils/filter';

export type FilterData = {
  [key: string]: string[] | [];
};
const BooksPageTemplate = ({ filters }: BooksProps) => {
  const [filterData, setFilterData] = useState<FilterData>({
    authors: [],
    publishers: [],
    categories: []
  });
  const { push, query, pathname } = useRouter();

  const { data, error } = useQuery<
    BooksFiltersQuery,
    BooksFiltersQueryVariables
  >(BOOKS_FILTERS_QUERY, {
    variables: {
      page: 1,
      pageSize: 3,
      filters: parseQueryStringToFilter({ queryString: query }),
      sort: ['title']
    }
  });

  useEffect(() => {
    updateQueryResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  function updateQueryResults() {
    if (!query) return;

    let updatedQuery: ParsedUrlQueryInput = {};

    Object.keys(filterData).forEach((key) => {
      if (filterData[key].length) {
        updatedQuery[key] = filterData[key];
      }
    });
    push({ pathname: '/books', query: updatedQuery });
    return;
  }

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
