import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { REGISTER_MUTATION } from 'graphql/mutations/user';
import { signIn } from 'next-auth/react';
import Paper from '@mui/material/Paper';
import { AppbarHeader } from 'components/Appbar/styles';
import Link from 'next/link';

type FormValues = {
  email: string;
  password: string;
  showPassword: boolean;
  username: string;
};

const FormSignUp = () => {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    showPassword: false,
    username: ''
  });

  const [createUser, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: (data) => {
      console.log('createuser-completed', data);
      signIn('credentials', {
        email: values.email,
        password: values.password,
        callbackUrl: '/'
      });
    },
    onError: (error) => console.log('eroorr', error)
  });

  const handleChange = (
    key: keyof FormValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [key]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password, username } = values;
    createUser({ variables: { username, email, password } });
  };

  return (
    <Paper elevation={5} sx={{ width: '30%', height: '42%' }}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 8%'
          }}
        >
          <Link href="/" passHref>
            <AppbarHeader>Book Store</AppbarHeader>
          </Link>
          <TextField
            id="username"
            fullWidth
            label="Username"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('username', event)
            }
            sx={{ marginBottom: 3 }}
            value={values.username}
          />
          <TextField
            id="email"
            fullWidth
            label="Email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('email', event)
            }
            sx={{ marginBottom: 3 }}
            value={values.email}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('password', event)
              }
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
            />
          </FormControl>
          <Button
            aria-label="sign up"
            type="submit"
            variant="contained"
            sx={{
              color: 'white',
              textTransform: 'none',
              height: '3.2rem',
              width: '100%',
              marginTop: '6%'
            }}
          >
            Sign up
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default FormSignUp;
