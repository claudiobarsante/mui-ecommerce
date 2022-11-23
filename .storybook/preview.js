import theme from '/src/styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import CssBaseline from '@mui/material/CssBaseline';
import { SessionProvider } from 'next-auth/react';
import {
  WishlistContext,
  WishlistContextDefaultValues
} from 'hooks/use-wishlist';

const mockSession = {
  user: {
    id: '1',
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsImlhdCI6MTY2ODcxMTEwMSwiZXhwIjoxNjcxMzAzMTAxfQ.aglUmEdH3Cu-XmT-Cox5iidI4X-Ri2nuedqRidTgVXg',
    name: 'Mock User',
    email: 'mockuser@gmail.com'
  },
  expires: '2022-12-21T14:55:42.374Z'
};
const withThemeProvider = (Story, context) => {
  return (
    <SessionProvider session={mockSession}>
      <Emotion10ThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <WishlistContext.Provider value={{ ...WishlistContextDefaultValues }}>
            <CssBaseline />
            <Story {...context} />
          </WishlistContext.Provider>
        </ThemeProvider>
      </Emotion10ThemeProvider>
    </SessionProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true, //to show the type of the property
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
