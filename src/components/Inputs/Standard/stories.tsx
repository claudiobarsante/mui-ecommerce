import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';
import StandardInput, { StandardInputProps } from '.';
import { FieldErrors } from 'utils/validations';
import { FormValues } from 'components/FormSignUp';

export default {
  title: 'Inputs/StandardInput',
  component: StandardInput,
  args: {
    field: 'username',
    fieldError: {} as FormValues,
    handleOnBlur: () => {},
    handleOnChange: () => {},
    label: 'Username',
    values: {} as FormValues
  }
} as ComponentMeta<typeof StandardInput>;

const defaultValues: FormValues = {
  email: '',
  password: '',
  confirmPassword: '',
  username: ''
};

const Template: ComponentStory<typeof StandardInput> = (
  args: StandardInputProps
) => {
  // const [values, setValues] = useState<FormValues>(defaultValues);
  // const handleOnChange = (
  //   field: keyof FormValues,
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setValues({ ...values, [field]: event.target.value });
  // };

  // const handleOnBlur = () => {};
  return (
    <StandardInput
      {...args}
      sx={{ marginBottom: '2rem', marginTop: '4rem', width: '200px' }}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Username'
};

export const WithError = Template.bind({});
WithError.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const input = canvas.getByLabelText('Username', { selector: 'input' });

  await userEvent.type(input, 'any text', {
    delay: 100
  });
};
WithError.args = {
  fieldError: { ...defaultValues, username: 'any error message for username' }
};

// export const Default = () => {
//   const [values, setValues] = useState<FormValues>(defaultValues);
//   const handleOnChange = (
//     field: keyof FormValues,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setValues({ ...values, [field]: event.target.value });
//   };

//   const handleOnBlur = () => {};
//   return (
//     <StandardInput
//       field="username"
//       fieldError={{} as FormValues} //
//       handleOnBlur={handleOnBlur}
//       handleOnChange={handleOnChange}
//       label="Username"
//       values={values}
//       sx={{ marginBottom: '2rem', marginTop: '4rem', width: '200px' }}
//     />
//   );
// };
// const Template: ComponentStory<typeof StandardInput> = (
//   args: StandardInputProps
// ) => {
//   const [values, setValues] = useState<FormValues>(defaultValues);
//   const handleOnChange = (
//     field: keyof FormValues,
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setValues({ ...values, [field]: event.target.value });
//   };

//   const handleOnBlur = () => {};
//   return (
//     <StandardInput
//       field="username"
//       fieldError={{} as FormValues} //
//       handleOnBlur={handleOnBlur}
//       handleOnChange={handleOnChange}
//       label="Username"
//       values={values}
//       sx={{ marginBottom: '2rem', marginTop: '4rem', width: '200px' }}
//     />
//   );
// };

// export const Default = Template.bind({});
// Default.args = {
//   field: 'email'
// };

// export const WithError = Template.bind({});
// WithError.args = {
//   field:'username'
//   fieldError: { ...defaultValues, username: 'dfgdfgdfg' }
// };

// const mockFormValues: FormValues = {
//   email: '',
//   password: '',
//   confirmPassword: '',
//   username: ''
// };
// Default.args = {
//   field: 'username',
//   fieldError: {} as FormValues,
//   values: mockFormValues,
//   label: 'Username',
//   sx: { width: '200px' }
// };
