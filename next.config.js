/* eslint-disable no-param-reassign */

const path = require('path');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withSass = require('@zeit/next-sass');
const packageImporter = require('node-sass-package-importer');

function webpack(config, options) {
  if (options.isServer) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve('src'),
    '@': path.resolve('.'),
  };

  return config;
}

const cssModulesOptions = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[name]__[local]--[hash:base64:5]',
  },
  importer: packageImporter(),
};

const nextOptions = {
  webpack,
  ...cssModulesOptions,
};

module.exports = withTypescript(withSass(nextOptions));
