import { Box, Container, Grid, Typography } from '@mui/material';
import FormSignIn from 'components/FormSignIn';
import FormSignUp from 'components/FormSignUp';
import Image from 'next/image';
import { Colors } from 'styles/theme/colors';
const image = '/images/5281-LB.jpg';
import * as S from './styles';

const SignInTemplate = () => {
  return (
    <Grid container height="100vh" width="100vw">
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.lightBlue,
          position: 'relative'
        }}
      >
        <S.PictureHeader>Your companion anywhere</S.PictureHeader>
        <S.ImageContainer>
          <Image
            src={image}
            alt="People reading books in the subway"
            height={700}
            width={900}
            aria-label="People reading books in the subway"
          />
        </S.ImageContainer>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '6%'
        }}
      >
        <S.FormContainer>
          <FormSignIn />
        </S.FormContainer>
      </Grid>
    </Grid>
  );
};

export default SignInTemplate;
