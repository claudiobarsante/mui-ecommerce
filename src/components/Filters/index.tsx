import FormHeader from 'components/FormHeader';
import * as React from 'react';

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
      <FilterAccordion filters={filters} title="Authors" field="author" />
    </>
  );
};

export default Filters;
