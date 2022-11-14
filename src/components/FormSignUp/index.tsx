import { useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
// Material ui
import Box from '@mui/material/Box';

import { Typography } from '@mui/material';

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

import StandardInput from 'components/Inputs/Standard';
import FormHeader from 'components/FormHeader';
import PasswordInput from 'components/Inputs/Password';
import CustomTitle from 'components/Title';

export type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

const FormSignUp = () => {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [fieldError, setFieldError] = useState<FieldErrors>({} as FieldErrors);

  const [createUser, { loading: loadingCreateUser }] = useMutation(
    REGISTER_MUTATION,
    {
      onCompleted: () => {
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
        <CustomTitle
          color="primary"
          href="/"
          size="medium"
          sx={{ marginBottom: '2rem' }}
          text="Book  Store"
        />

        <FormHeader text="Sign Up" color="primary" />
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

        <PasswordInput
          field="password"
          fieldError={fieldError}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          values={values}
          sx={{ marginBottom: 3 }}
        />
        <PasswordInput
          field="confirmPassword"
          fieldError={fieldError}
          handleOnBlur={handleOnBlur}
          handleOnChange={handleOnChange}
          values={values}
        />

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
