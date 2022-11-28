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
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50px'
      }}
    >
      <WishlistButton {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.parameters = {
  layout: 'centered'
};
