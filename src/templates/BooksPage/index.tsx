import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
// -- Mui5
import { Pagination, TextField } from '@mui/material';

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

import useUpdateQueryResults from './hooks/use-Update-Query';

export type FilterData = {
  [key: string]: string[] | [];
};
const BooksPageTemplate = ({ filters }: BooksProps) => {
  const [filterData, setFilterData] = useState<FilterData>({
    authors: [],
    publishers: [],
    categories: []
  });

  const { query } = useRouter();
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

  const { updateQueryResults } = useUpdateQueryResults();

  useEffect(() => {
    let isComponentMounted = true;
    //* do some debounce to avoid on every keystroke to hit the server
    const timer = setTimeout(() => {
      if (timer) clearTimeout(timer);
      updateQueryResults(isComponentMounted, filterData, page, searchText);
    }, 500);

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
