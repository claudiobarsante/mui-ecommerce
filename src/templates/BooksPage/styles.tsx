import { styled, Theme } from '@mui/material/styles';
import { Box, Container } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '10% 85% 5%',
  gridTemplateAreas: "'filters search''filters books' 'filters pagination'",
  gridTemplateColumns: '20% 80%',
  maxWidth: '100%',
  //height: '85vh',
  border: '1px solid blue',

  [theme.breakpoints.down('md')]: {
    gridTemplateRows: '10% 10% 65% 5%',
    gridTemplateAreas: "'search''filters' 'books' 'pagination'",
    gridTemplateColumns: '100%',
    height: '85vh'
  }
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
  gridArea: 'search',
  border: '1px solid green'

  //height: '5%'
}));

export const FiltersContainer = styled(Box)(({ theme }) => ({
  gridArea: 'filters',
  border: '1px solid red',
  justifyItems: 'flex-start'
}));

export const BooksContainer = styled(Box)(({ theme }) => ({
  gridArea: 'books',
  border: '1px solid yellow'
  // height: '56vh'
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  gridArea: 'pagination',
  border: '1px solid purple'
  //height: '6vh'
}));
