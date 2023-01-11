import { useRouter } from 'next/router';
import { FilterData } from 'templates/BooksPage';
import { ParsedUrlQueryInput } from 'querystring';

const useUpdateQueryResults = () => {
  const { push } = useRouter();

  const updateQueryResults = (
    mounted: boolean,
    filterData: FilterData,
    page: number,
    searchText: string
  ) => {
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
  };

  return { updateQueryResults };
};

export default useUpdateQueryResults;
