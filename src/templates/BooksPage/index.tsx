import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { ParsedUrlQueryInput } from 'querystring';
// -- Mui5
import Pagination from '@mui/material/Pagination';
// --Styles
import * as S from './styles';
// --Query
import { BOOKS_FILTERS_QUERY } from 'graphql/queries/books';
// -- Utils
import { parseQueryStringToFilter } from 'utils/filter';
// -- Types
import {
  BooksFiltersQuery,
  BooksFiltersQueryVariables
} from 'graphql/generated/graphql';
import { BooksProps } from 'pages/books';
// -- Components
import Books, { BookSummary } from 'components/Books';
import Filters from 'components/Filters';

import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { initializeApollo } from 'graphql/client/apolloClient';

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
  const [page, setPage] = useState(1);
  const apolloClient = initializeApollo();

  // const { data, error, loading } = useQuery<
  //   BooksFiltersQuery,
  //   BooksFiltersQueryVariables
  // >(BOOKS_FILTERS_QUERY, {
  //   variables: {
  //     page: page,
  //     pageSize: 8,
  //     filters: parseQueryStringToFilter({ queryString: query }),
  //     sort: ['title']
  //   }
  // });

  const data = apolloClient.readQuery({
    query: BOOKS_FILTERS_QUERY,
    variables: {
      page: page,
      pageSize: 8,
      filters: parseQueryStringToFilter({ queryString: query }),
      sort: ['title']
    }
  });

  const updateQueryResults = () => {
    let updatedQuery: ParsedUrlQueryInput = {};

    Object.keys(filterData).forEach((key) => {
      if (filterData[key].length) {
        updatedQuery[key] = filterData[key];
      }
    });

    updatedQuery = { ...updatedQuery, page };

    push({ pathname: '/books', query: updatedQuery });
    return;
  };

  useEffect(() => {
    updateQueryResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <S.PageContainer>
      <S.FiltersContainer>
        <Filters
          filters={filters}
          setFilterData={setFilterData}
          setPage={setPage}
        />
        {JSON.stringify(filterData)}
        {/* {loading && <h1>LOADING</h1>} */}
      </S.FiltersContainer>
      <S.SearchContainer component="section">
        <p>Search</p>
      </S.SearchContainer>
      <S.BooksContainer component="section">
        {data?.books && <Books books={data.books.data as BookSummary[]} />}
      </S.BooksContainer>
      <S.PaginationContainer component="section">
        <Pagination
          count={data?.books?.meta?.pagination?.pageCount}
          color="secondary"
          page={page}
          onChange={handleChange}
        />
        <p>total {data?.books?.meta?.pagination?.total}</p>
      </S.PaginationContainer>
    </S.PageContainer>
  );
};

export default BooksPageTemplate;
