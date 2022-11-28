import React from 'react';

import FormHeader from 'components/FormHeader';
import { FiltersQuery } from 'graphql/generated/graphql';
import FilterAccordion from 'components/Accordion';

type Props = {
  filters: FiltersQuery;
};

const Filters = ({ filters }: Props) => {
  console.log('datafilters', filters);
  return (
    <>
      <FormHeader color="primary" text=" Filters" sx={{ marginTop: '1rem' }} />
      <FilterAccordion filters={filters} title="Authors" filter="authors" />
      <FilterAccordion
        filters={filters}
        title="Categories"
        filter="categories"
      />
      <FilterAccordion
        filters={filters}
        title="Publishers"
        filter="publishers"
      />
    </>
  );
};

export default Filters;
