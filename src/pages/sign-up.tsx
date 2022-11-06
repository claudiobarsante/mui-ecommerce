import { Box, Container } from '@mui/material';
import FormSignUp from 'components/FormSignUp';
const image = '/images/5281.jpg';
export default function SignUp() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh'
      }}
    >
      <FormSignUp />
    </Container>

    //     <div
    //       style={{
    //         backgroundImage: `url(${image})`,
    //         backgroundPosition: 'center',
    //         backgroundRepeat: 'no-repeat',
    //         backgroundSize: 'cover',
    //         width: '100vw',
    //         height: '100vh',
    //         border: '1px solid blue'
    //       }}
    //     >
    //       <FormSignUp />
    //     </div>
  );
}
