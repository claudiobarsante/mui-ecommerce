import React, { Dispatch, SetStateAction } from 'react';

import FormHeader from 'components/FormHeader';
import { FiltersQuery } from 'graphql/generated/graphql';
import FilterAccordion from 'components/Accordion';
import { FilterData } from 'templates/BooksPage';

type Props = {
  filters: FiltersQuery;
  setFilterData: Dispatch<SetStateAction<FilterData>>;
};

const Filters = ({ filters, setFilterData }: Props) => {
  console.log('datafilters', filters);
  return (
    <>
      <FormHeader color="primary" text=" Filters" sx={{ marginTop: '1rem' }} />
      <FilterAccordion
        filters={filters}
        title="Authors"
        filter="authors"
        setFilterData={setFilterData}
      />
      {/* <FilterAccordion
        filters={filters}
        title="Categories"
        filter="categories"
      />
      <FilterAccordion
        filters={filters}
        title="Publishers"
        filter="publishers"
      /> */}
    </>
  );
};

export default Filters;
