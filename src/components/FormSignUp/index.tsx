import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { REGISTER_MUTATION } from 'graphql/mutations/user';
import { signIn } from 'next-auth/react';

import { AppbarHeader } from 'components/Appbar/styles';
import Link from 'next/link';
import {
  FieldErrors,
  FormFields,
  signUpValidate,
  validateField
} from 'utils/validations';

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

  const handleOnChange = (
    field: keyof FormValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleOnClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    });
  };

  const handleOnMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password, username, confirmPassword } = values;
    setFieldError({} as FieldErrors);
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

  const handleOnBlur = useCallback(
    (field: keyof FormFields) => {
      const errorCheck = validateField(field, values[field]) as FieldErrors;

      if (errorCheck.hasOwnProperty(field)) {
        setFieldError((previous) => ({
          ...previous,
          [field]: errorCheck[field]
        }));
      }
    },
    [values]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '25rem'
        }}
      >
        {JSON.stringify(fieldError)}
        <Link href="/" passHref>
          <AppbarHeader>Book {''} Store</AppbarHeader>
        </Link>
        <TextField
          id="username"
          aria-label="input for username"
          fullWidth
          label="Username"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange('username', event)
          }
          sx={{ marginBottom: 3, marginTop: 5 }}
          variant="standard"
          value={values.username}
          error={fieldError.hasOwnProperty('username')}
          helperText={fieldError.username}
          onBlur={() => handleOnBlur('username')}
        />
        <TextField
          id="email"
          aria-label="input for email"
          fullWidth
          label="Email"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleOnChange('email', event)
          }
          sx={{ marginBottom: 3 }}
          variant="standard"
          value={values.email}
          error={fieldError.hasOwnProperty('email')}
          helperText={fieldError.email}
          onBlur={() => handleOnBlur('email')}
        />
        <FormControl variant="standard" fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            aria-label="input for password"
            id="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleOnClickShowPassword}
                  onMouseDown={handleOnMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange('password', event)
            }
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            error={fieldError.hasOwnProperty('password')}
            onBlur={() => handleOnBlur('password')}
          />
          <FormHelperText
            id="component-error-text"
            aria-labelledby="password"
            error={fieldError.hasOwnProperty('password')}
          >
            {fieldError.password}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard" fullWidth>
          <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>
          <Input
            id="confirm-password"
            aria-label="input for confirm password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleOnClickShowPassword}
                  onMouseDown={handleOnMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleOnChange('confirmPassword', event)
            }
            type={values.showPassword ? 'text' : 'password'}
            value={values.confirmPassword}
            error={fieldError.hasOwnProperty('confirmPassword')}
            //onBlur={() => handleOnBlur('confirmPassword')}
          />
          <FormHelperText
            id="component-error-text"
            error={fieldError.hasOwnProperty('confirmPassword')}
            aria-labelledby="confirm-password"
          >
            {fieldError.confirmPassword}
          </FormHelperText>
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
