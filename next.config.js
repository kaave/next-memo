/* eslint-disable import/no-extraneous-dependencies */
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withSass = require('@zeit/next-sass');

function webpack(config, options) {
  if (options.isServer) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  return config;
}

module.exports = withTypescript(withSass({ webpack }));
