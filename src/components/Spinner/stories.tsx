import { ComponentStory, ComponentMeta } from '@storybook/react';
import Spinner, { SpinnerProps } from '.';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered'
  }
} as ComponentMeta<typeof Spinner>;

const Template: ComponentStory<typeof Spinner> = (args: SpinnerProps) => {
  return <Spinner {...args} />;
};

export const Default = Template.bind({});
