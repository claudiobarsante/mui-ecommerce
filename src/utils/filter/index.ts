import { ParsedUrlQueryInput } from 'querystring';
import { FilterData } from 'templates/BooksPage';

type ParseArgs = {
  queryString: ParsedUrlQueryInput;
};

type QueryMapper = {
  [key: string]: string;
};

export const parseQueryStringToFilter = ({ queryString }: ParseArgs) => {
  let obj: any = {};

  //? Here it's a trick part, the filters in the query books are type BookFiltersInput
  //? filters: BookFiltersInput(look Strapi Docs and schema)
  //? The query FILTERS_QUERY on books page return all the available filters but the data
  //? result it's the type "FiltersQuery", so in order to build the correct filters to the BOOKS_FILTERS_QUERY
  //? I had to map the fields from the query to the types available in BookFiltersInput type
  // -- |FILTERS_QUERY TYPE | BookFiltersInput type
  // -- | authors           | authors
  // -- | categories        | category
  // -- | publishers        | publisher

  Object.keys(queryString)
    .filter((key) => key !== 'page')
    .forEach((key) => {
      const queryMapper: QueryMapper = {
        authors: 'authors',
        categories: 'category',
        publishers: 'publisher'
      };

      const queryKey = queryMapper[key];

      if (Array.isArray(queryString[key])) {
        obj[queryKey] = { name: { in: queryString[key] } };
      } else {
        obj[queryKey] = { name: { eq: queryString[key] } };
      }
    });

  return obj;
};
