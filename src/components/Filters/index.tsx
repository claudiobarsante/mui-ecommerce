import React, { Dispatch, SetStateAction } from 'react';

import FormHeader from 'components/FormHeader';
import { FiltersQuery } from 'graphql/generated/graphql';
import FilterAccordion from 'components/Accordion';
import { FilterData } from 'templates/BooksPage';

type Props = {
  filters: FiltersQuery;
  setFilterData: Dispatch<SetStateAction<FilterData>>;
  setPage: Dispatch<SetStateAction<number>>;
};

const Filters = ({ filters, setFilterData, setPage }: Props) => {
  return (
    <>
      <FormHeader color="primary" text=" Filters" sx={{ marginTop: '1rem' }} />
      <FilterAccordion
        filters={filters}
        title="Authors"
        filter="authors"
        setFilterData={setFilterData}
        setPage={setPage}
      />
      <FilterAccordion
        filters={filters}
        title="Categories"
        filter="categories"
        setFilterData={setFilterData}
        setPage={setPage}
      />
      <FilterAccordion
        filters={filters}
        title="Publishers"
        filter="publishers"
        setFilterData={setFilterData}
        setPage={setPage}
      />
    </>
  );
};

export default Filters;
