// module.exports = {
//   stories: [
//     '../src/**/*.stories.mdx',
//     '../src/**/*.stories.@(js|jsx|ts|tsx)',
//     '../src/components/**/stories.tsx'
//   ],
//   addons: [
//     '@storybook/addon-links',
//     '@storybook/addon-essentials',
//     '@storybook/addon-interactions'
//   ],
//   features: {
//     emotionAlias: false
//   },
//   framework: '@storybook/react'
// };
//#region

//#endregion

const path = require('path');
const toPath = (filePath) => path.join(process.cwd(), filePath);

module.exports = {
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
          'styles/theme/colors': path.resolve(
            __dirname,
            '../src/styles/theme/colors'
          )
        }
      }
    };
  },
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/components/**/stories.tsx'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-material-ui',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react'
};
