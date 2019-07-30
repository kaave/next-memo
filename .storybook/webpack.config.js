const path = require('path');

module.exports = ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve(process.cwd(), 'src'),
    '@': path.resolve(process.cwd(), '.'),
  };

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      { loader: require.resolve('babel-loader') },
      { loader: require.resolve('react-docgen-typescript-loader') },
      {
        loader: require.resolve('@storybook/addon-storysource/loader'),
        options: { parser: 'typescript' },
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
