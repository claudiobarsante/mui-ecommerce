import React, { useState } from 'react';
import { styled } from '@mui/material/styles';

import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import { FiltersQuery } from 'graphql/generated/graphql';

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
  filter: 'authors' | 'publishers' | 'categories';
  title: string;
};

type Check = {
  [key: string]: boolean;
};

const FilterAccordion = ({ filters, filter, title }: Props) => {
  const [checked, setChecked] = useState<Check>({});

  const selectedFilter = filters[filter];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((previous) => ({
      ...previous,
      [event.target.name]: event.target.checked
    }));
  };

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
          {selectedFilter?.data &&
            selectedFilter?.data.map((author) => (
              <FormControlLabel
                key={author.id}
                control={
                  <Checkbox
                    inputProps={{
                      'aria-label': `checkbox for ${author.attributes?.name}`
                    }}
                    onChange={handleChange}
                    checked={checked[author.attributes?.name!] === true}
                    name={author.attributes?.name!}
                  />
                }
                label={author.attributes?.name}
                value={author.id}
              />
            ))}
        </FormGroup>
      </AccordionDetails>
      <p>{JSON.stringify(checked)}</p>
    </Accordion>
  );
};

export default FilterAccordion;
