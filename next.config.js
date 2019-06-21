/* eslint-disable no-param-reassign */

const path = require('path');
const dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withSass = require('@zeit/next-sass');
const packageImporter = require('node-sass-package-importer');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

dotenv.config();

function webpack(config, options) {
  if (options.isServer) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  config.resolve.alias = {
    ...config.resolve.alias,
    '~': path.resolve('src'),
    '@': path.resolve('.'),
  };

  config.plugins = [
    ...config.plugins,
    new DotenvWebpack({
      path: path.join(__dirname, '.env'),
      systemvars: true,
    }),
  ];

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

const analyzerOptions = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: './bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html',
    },
  },
};

const nextOptions = {
  webpack,
  ...cssModulesOptions,
  ...analyzerOptions,
};

module.exports = withBundleAnalyzer(withTypescript(withSass(nextOptions)));
