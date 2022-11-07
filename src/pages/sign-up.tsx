import { Box, Container, Grid, Typography } from '@mui/material';
import FormSignUp from 'components/FormSignUp';
import Image from 'next/image';
import { Colors } from 'styles/theme/colors';
import { styled, Theme } from '@mui/material/styles';
const image = '/images/4807-G.jpg';

export const FormHeader = styled(Typography)(() => ({
  padding: '0.4rem',
  flexGrow: 1,
  fontSize: '5rem',
  fontFamily: '"Montez", "cursive"',
  color: Colors.white,
  position: 'absolute',
  top: '10%',
  zIndex: 10
}));

export default function SignUp() {
  return (
    <Grid container height="100vh">
      <Grid
        item
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary,
          position: 'relative'
        }}
      >
        <FormHeader>All your favorite books in one place</FormHeader>
        <Image
          src={image}
          alt="People reading books"
          height={700}
          width={900}
        />
      </Grid>
      <Grid
        item
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '6%'
        }}
      >
        <FormSignUp />
      </Grid>
    </Grid>
  );
}
