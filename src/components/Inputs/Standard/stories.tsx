import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import StandardInput, { StandardInputProps } from '.';
import { FieldErrors } from 'utils/validations';
import { FormValues } from 'components/FormSignUp';

export default {
  title: 'Inputs/StandardInput',
  component: StandardInput
} as ComponentMeta<typeof StandardInput>;

const Template: ComponentStory<typeof StandardInput> = (args) => (
  <StandardInput {...args} />
);

export const Primary = Template.bind({});

const mockFormValues: FormValues = {
  email: '',
  password: '',
  confirmPassword: '',
  username: 'John Smith'
};
Primary.args = {
  field: 'username',
  fieldError: {} as FormValues,
  values: mockFormValues,
  label: 'Username'
};
