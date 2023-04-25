import React from 'react';
import { Container } from '@mui/material';
// -- Custom components
import Appbar from 'components/Appbar';

export type BaseLayoutProps = {
  children: React.ReactNode;
};
const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Container maxWidth="xl">
      <Appbar />
      {children}
    </Container>
  );
};

export default BaseLayout;
