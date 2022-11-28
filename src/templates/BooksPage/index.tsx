import * as S from './styles';
import Filters from './../../components/Filters/index';
import { FiltersQuery, FiltersQueryResult } from 'graphql/generated/graphql';
import { BooksProps } from 'pages/books';

type Props = {
  filters: FiltersQuery;
};

const BooksPageTemplate = ({ filters }: BooksProps) => {
  return (
    <S.PageContainer>
      <S.FiltersContainer>
        <Filters filters={filters} />
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
