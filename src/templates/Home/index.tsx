import React from 'react';
import { Box, Typography } from '@mui/material';
// -- Custom components
import BaseLayout from 'templates/BaseLayout';
import HeroBanner from 'components/HeroBanner';
import PromotionsSlider from 'components/PromotionsSlider';
import Books, { BookSummary } from 'components/Books';

type Props = {
  books: BookSummary[];
};
const HomeTemplate = ({ books }: Props) => {
  return (
    <BaseLayout>
      <HeroBanner />
      <PromotionsSlider />
      <Box display="flex" justifyContent="center" sx={{ p: 4 }}>
        <Typography variant="h4">Featured</Typography>
      </Box>
      <Books books={books} />
    </BaseLayout>
  );
};

export default HomeTemplate;
