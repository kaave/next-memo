const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = ({ config }) => {
  config.resolve = config.resolve || {};
  config.resolve.plugins = config.resolve.plugins || [];

  config.resolve.plugins.push(new TsconfigPathsPlugin());

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

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          localIdentName: '[name]__[local]___[hash:base64:5]',
          modules: true,
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'sass-loader',
        options: { sourceMap: true },
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
