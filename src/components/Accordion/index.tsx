import * as React from 'react';

import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import { styled } from '@mui/material/styles';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {
  BooksFiltersQuery,
  FiltersQuery,
  FiltersQueryResult
} from 'graphql/generated/graphql';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: 0,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

type Props = {
  filters: FiltersQuery;
  field: string;
  title: string;
};

const FilterAccordion = ({ filters, field, title }: Props) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {filters?.authors?.data &&
            filters.authors.data.map((author) => (
              <FormControlLabel
                key={author.id}
                control={<Checkbox />}
                label={author.attributes?.name}
                value={author.id}
              />
            ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
