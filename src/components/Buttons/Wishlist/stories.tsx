import { ComponentStory, ComponentMeta } from '@storybook/react';

import WishlistButton from '.';

export default {
  title: 'Components/Buttons/WishlistButton',
  component: WishlistButton,
  args: {
    bookId: '8'
  }
} as ComponentMeta<typeof WishlistButton>;

const Template: ComponentStory<typeof WishlistButton> = (args) => {
  return <WishlistButton {...args} />;
};

export const Default = Template.bind({});
Default.parameters = {
  layout: 'centered'
};
