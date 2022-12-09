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
    .filter((key) => key !== 'page' && key !== 'searchText')
    .forEach((key) => {
      const queryMapper: QueryMapper = {
        authors: 'authors',
        categories: 'category',
        publishers: 'publisher'
      };

      const queryKey = queryMapper[key];
      // -- Left-side filters on BooksPageTemplate
      if (Array.isArray(queryString[key])) {
        obj[queryKey] = { name: { in: queryString[key] } };
      } else {
        obj[queryKey] = { name: { eq: queryString[key] } };
      }
    });

  //? -- SearchText - will search in book title, author and publisher
  //#region SearchText
  /**
 * Strapi has a bug that, if you want to use "or", you have to group with another clause.
 * So, in this case I'm using with the filters and then group  with the "or" clause
 * Here is the answer of a Strapi Engineer -->
 * If you want to use or, you need to pass all the targeted clauses inside its array, putting the or next to another clause will create an and clause between the or components and the other ones.
 * Basically, what should work would be smth like: or: [{ slug: { eq: $slug } }, { itSlug: { eq: $slug } }]
 *
 * or: [
          { title: { containsi: $searchText } }
          { authors: { name: { containsi: $searchText } } }
          { publisher: { name: { containsi: $searchText } } }
        ]
        */
  /**
     * or: [
          { title: { containsi: $searchText } }
          { authors: { name: { containsi: $searchText } } }
          { publisher: { name: { containsi: $searchText } } }
        ]        
     */
  //#endregion
  if (queryString.hasOwnProperty('searchText')) {
    const searchText = queryString['searchText'];
    obj = {
      ...obj,
      or: [
        { title: { containsi: searchText } },
        { authors: { name: { containsi: searchText } } },
        { publisher: { name: { containsi: searchText } } }
      ]
    };
  }
  return obj;
};
