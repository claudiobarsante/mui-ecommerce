// import CssBaseline from '@mui/material/CssBaseline';
// import theme from '/src/styles/theme';

// import { ThemeProvider } from '@mui/material/styles';
// //import { ThemeProvider } from 'emotion-theming';
// export const parameters = {
//   actions: { argTypesRegex: '^on[A-Z].*' },
//   controls: {
//     matchers: {
//       color: /(background|color)$/i,
//       date: /Date$/
//     }
//   }
// };

// console.log('theme', theme);
// // export const decorators = [
// //   (Story) => (
// //     <MUIThemeProvider theme={theme}>
// //       <ThemeProvider theme={theme}>{Story()}</ThemeProvider>
// //     </MUIThemeProvider>
// //   )
// // ];
// //export const decorators = [muiTheme([theme])];
// export const decorators = [
//   (Story) => {
//     <ThemeProvider theme={theme}>
//       <Story />
//     </ThemeProvider>;
//   }
// ];
import theme from '/src/styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
import CssBaseline from '@mui/material/CssBaseline';

const withThemeProvider = (Story, context) => {
  return (
    <Emotion10ThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story {...context} />
      </ThemeProvider>
    </Emotion10ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
