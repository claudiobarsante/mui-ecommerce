import React, { Dispatch, SetStateAction, useState } from 'react';
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
import { FilterData } from 'templates/BooksPage';

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
  setFilterData: Dispatch<SetStateAction<FilterData>>;
  setPage: Dispatch<SetStateAction<number>>;
};

type CheckedItem = {
  [key: string]: boolean;
};

const FilterAccordion = ({
  filters,
  filter,
  title,
  setFilterData,
  setPage
}: Props) => {
  const [checked, setChecked] = useState<CheckedItem>({});
  // selectedFilter is the object with the data of a specific filter
  const selectedFilter = filters[filter];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((previous) => ({
      ...previous,
      [event.target.name]: event.target.checked
    }));
    // if user is checking the item from filter add to filterData, if not, remove from filterData
    if (event.target.checked) {
      setFilterData((previous) => ({
        ...previous,
        [filter]: [...previous[filter], event.target.name]
      }));
    } else {
      setFilterData((previous) => {
        const updatedFilterData = previous[filter].filter(
          (item) => item !== event.target.name
        );
        return { ...previous, [filter]: updatedFilterData };
      });
    }
    setPage(1); // on every cheking reset the page to one to show the first results
  };

  return (
    <>
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
              selectedFilter?.data.map((item) => (
                <FormControlLabel
                  key={item.id}
                  control={
                    <Checkbox
                      inputProps={{
                        'aria-label': `checkbox for ${item.attributes?.name}`
                      }}
                      onChange={handleChange}
                      checked={checked[item.attributes?.name!] === true}
                      name={item.attributes?.name!}
                    />
                  }
                  label={item.attributes?.name}
                  value={item.id}
                />
              ))}
          </FormGroup>
        </AccordionDetails>
        <p>{JSON.stringify(checked)}</p>
      </Accordion>
    </>
  );
};

export default FilterAccordion;
