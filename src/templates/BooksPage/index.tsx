import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { TextField } from '@mui/material';

export type FilterData = {
  [key: string]: string[] | [];
};
const BooksPageTemplate = ({ filters }: BooksProps) => {
  const [filterData, setFilterData] = useState<FilterData>({
    authors: [],
    publishers: [],
    categories: []
  });

  const { push, query } = useRouter();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  const { data, error, loading } = useQuery<
    BooksFiltersQuery,
    BooksFiltersQueryVariables
  >(BOOKS_FILTERS_QUERY, {
    variables: {
      page: page,
      pageSize: 8,
      filters: parseQueryStringToFilter({ queryString: query }),
      sort: ['title']
    },
    notifyOnNetworkStatusChange: true
  });

  const updateQueryResults = useCallback(
    (mounted: boolean) => {
      // -- Only update the query and router page if the component is mounted
      if (!mounted) return;

      let updatedQuery: ParsedUrlQueryInput = {};

      Object.keys(filterData).forEach((key) => {
        if (filterData[key].length) {
          updatedQuery[key] = filterData[key];
        }
      });
      // -- page
      updatedQuery = { ...updatedQuery, page };
      // -- updates query only if it have searchText
      if (searchText) updatedQuery = { ...updatedQuery, searchText };
      //#region Avoid Error: Loading initial props cancelled at eval
      /*
    This may occur due to the users stopping the page load before it is fully loaded. 
    Also, this may happen when your DB Query Promise is not resolved yet and your 
    router will already try to route. push you onto another page
    */
      // -- Best Solution: check on the beginning of the function if the component is mounted.
      // -- If is mounted, you could use push and router with the new query.
      // -- Alternative solution: use shallow routing - see docs: https://nextjs.org/docs/routing/shallow-routing
      // push({ pathname: '/books', query: updatedQuery }, undefined, {
      //   shallow: true
      // });
      //#endregion
      push({ pathname: '/books', query: updatedQuery });
      return;
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [filterData, page, push, searchText]
  );

  useEffect(() => {
    let isComponentMounted = true;
    //* do some debounce to avoid on every keystroke to hit the server
    const timer = setTimeout(() => {
      if (timer) clearTimeout(timer);
      updateQueryResults(isComponentMounted);
    }, 1000);

    return () => {
      isComponentMounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData, page, searchText]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    // //todo: explain why is setting pegae to 1 when user types query

    setSearchText(event.target.value);
    if (page > 1) setPage(1);
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
      </S.FiltersContainer>
      <S.SearchContainer component="section">
        <TextField
          id="standard-basic"
          label="Type your query here..."
          variant="standard"
          value={searchText}
          onChange={handleChangeSearchText}
        />
        {loading && <h1>LOADING</h1>}
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
