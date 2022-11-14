import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
// Material ui
import Box from '@mui/material/Box';

import { Typography } from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import { REGISTER_MUTATION } from 'graphql/mutations/user';

import Link from 'next/link';
import {
  FieldErrors,
  FormFields,
  signInValidate,
  signUpValidate,
  validateField
} from 'utils/validations';

import StandardInput from 'components/Inputs/Standard';
import FormHeader from 'components/FormHeader';
import PasswordInput from 'components/Inputs/Password';
import CustomTitle from 'components/Title';
import { FormValues } from 'components/FormSignUp';

const FormSignIn = () => {
  const [values, setValues] = useState<FormValues>({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });
  const [formError, setFormError] = useState('');
  const [fieldError, setFieldError] = useState<FieldErrors>({} as FieldErrors);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { push, query } = router;

  const handleOnChange = (
    field: keyof FormValues,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const handleOnSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const errors = signInValidate({
      email: values.email,
      password: values.password
    });

    if (Object.keys(errors).length) {
      setFieldError(errors);
      setLoading(false);
      return;
    }

    setFieldError({} as FieldErrors);

    // sign in
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: `${window.location.origin}${query?.callbackUrl || ''}`
    });

    if (result?.url) {
      return push(result?.url);
    }

    setLoading(false);
    // jogar o erro
    setFormError('username or password is invalid');
  };

  const handleOnBlur = useCallback(
    (field: keyof FormFields) => {
      const errorCheck = validateField(field, values[field]) as FieldErrors;
      //const errorCheck = validateField(field, values[field] as string);
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
    <>
      {!!formError && <p>{formError}</p>}
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

          <FormHeader text="Sign In" color="primary" />

          <StandardInput
            field="email"
            fieldError={fieldError}
            handleOnBlur={handleOnBlur}
            handleOnChange={handleOnChange}
            label="E-mail"
            values={values}
            sx={{ marginBottom: '2rem', marginTop: '4rem' }}
          />

          <PasswordInput
            field="password"
            fieldError={fieldError}
            handleOnBlur={handleOnBlur}
            handleOnChange={handleOnChange}
            values={values}
            sx={{ marginBottom: 3 }}
          />

          <LoadingButton
            loading={loading}
            aria-label="sign in"
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
            Sign in
          </LoadingButton>
          <Typography variant="subtitle2" gutterBottom>
            Forgot your password?{'  '}
            <Link href="/">
              <a>Remember me</a>
            </Link>
          </Typography>
        </Box>
      </form>
    </>
  );
};

export default FormSignIn;
