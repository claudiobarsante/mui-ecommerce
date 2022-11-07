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
import { FieldErrors, signUpValidate } from 'utils/validations';

export type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  username: string;
};

const FormSignUp = () => {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    username: ''
  });
  const [fieldError, setFieldError] = useState<FieldErrors>({} as FieldErrors);

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
    field: keyof FormValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [field]: event.target.value });
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
    const { email, password, username, confirmPassword } = values;
    const errors = signUpValidate({
      email,
      password,
      username,
      confirmPassword
    });

    if (Object.keys(errors).length) {
      setFieldError(errors);
      return;
    }

    createUser({ variables: { username, email, password } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '25rem'
        }}
      >
        <Link href="/" passHref>
          <AppbarHeader>Book {''} Store</AppbarHeader>
        </Link>
        <TextField
          id="username"
          fullWidth
          label="Username"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('username', event)
          }
          sx={{ marginBottom: 3, marginTop: 5 }}
          variant="standard"
          value={values.username}
          error={fieldError.hasOwnProperty('username')}
          helperText={fieldError.username}
        />
        <TextField
          id="email"
          fullWidth
          label="Email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleChange('email', event)
          }
          sx={{ marginBottom: 3 }}
          variant="standard"
          value={values.email}
        />
        <FormControl variant="standard" fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('password', event)
            }
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
          />
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
          <Input
            id="confirm-password"
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChange('confirmPassword', event)
            }
            type={values.showPassword ? 'text' : 'password'}
            value={values.confirmPassword}
          />
        </FormControl>
        <Button
          aria-label="sign up"
          type="submit"
          variant="contained"
          sx={{
            color: 'white',
            height: '3.4rem',
            width: '100%',
            marginTop: '10%'
          }}
        >
          Sign up now
        </Button>
      </Box>
    </form>
  );
};

export default FormSignUp;
