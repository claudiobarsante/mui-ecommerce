import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
// Material ui
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import { Typography } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoadingButton from '@mui/lab/LoadingButton';
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
import { Colors } from 'styles/theme/colors';
import StandardInput from 'components/Inputs/Standard';

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

  const [createUser, { loading: loadingCreateUser }] = useMutation(
    REGISTER_MUTATION,
    {
      onCompleted: (data) => {
        console.log('createuser-completed', data);
        signIn('credentials', {
          email: values.email,
          password: values.password,
          callbackUrl: '/'
        });
      },
      onError: (error) => console.log('eroorr', error)
    }
  );

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

      //? cleaning previous error
      const hasPreviousError =
        fieldError.hasOwnProperty(field) && !errorCheck.hasOwnProperty(field);
      if (hasPreviousError) {
        setFieldError((previous) => {
          // Using the object restructuring and rest syntax, we can destructure the object with the property to be removed and create a new copy of it.
          // After the destructuring, a new copy of the object gets created and assigned to a new variable without the property that we chose to remove.
          // Assign to the [field] regex _ indicating that the [field] it will be not included
          const { [field]: _, ...updatedErrors } = previous;
          return updatedErrors as FieldErrors;
        });
      }

      if (errorCheck.hasOwnProperty(field)) {
        setFieldError((previous) => ({
          ...previous,
          [field]: errorCheck[field]
        }));
      }
    },
    [fieldError, values]
  );

  return (
    <form onSubmit={handleOnSubmit}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '25rem',
          position: 'relative'
        }}
      >
        <Link href="/" passHref>
          <AppbarHeader sx={{ marginBottom: '2rem' }}>
            Book {''} Store
          </AppbarHeader>
        </Link>
        <Box
          sx={{
            borderLeft: `0.4rem solid ${Colors.primary}`,
            paddingLeft: '0.5rem',
            position: 'absolute',
            top: '8.5rem',
            left: 0
          }}
        >
          <Typography sx={{ fontWeight: '500' }} variant="h5">
            Sign Up
          </Typography>
        </Box>
        <StandardInput
          field="username"
          fieldError={fieldError}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          label="Username"
          values={values}
          sx={{ marginBottom: '2rem', marginTop: '4rem' }}
        />
        <StandardInput
          field="email"
          fieldError={fieldError}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          label="E-mail"
          values={values}
          sx={{ marginBottom: '2rem' }}
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
          />
          <FormHelperText
            id="component-error-text"
            error={fieldError.hasOwnProperty('confirmPassword')}
            aria-labelledby="confirm-password"
          >
            {fieldError.confirmPassword}
          </FormHelperText>
        </FormControl>
        <LoadingButton
          loading={loadingCreateUser}
          aria-label="sign up"
          type="submit"
          variant="contained"
          sx={{
            color: 'white',
            height: '3.4rem',
            width: '100%',
            marginTop: '10%',
            marginBottom: '3%'
          }}
        >
          Sign up now
        </LoadingButton>
        <Typography variant="subtitle2" gutterBottom>
          Already hava an account?{'  '}
          <Link href="/sign-in">
            <a>Sign In</a>
          </Link>
        </Typography>
      </Box>
    </form>
  );
};

export default FormSignUp;
