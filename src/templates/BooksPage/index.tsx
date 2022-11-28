import * as S from './styles';
import Filters from './../../components/Filters/index';
const BooksPageTemplate = () => {
  return (
    <S.PageContainer>
      <S.FiltersContainer>
        <Filters />
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
