/* eslint-disable no-param-reassign */

const path = require('path');
const dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');
const withOffline = require('next-offline');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

dotenv.config();

function webpack(config, options) {
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

const workboxOptions = {};

const nextOptions = {
  webpack,
  ...analyzerOptions,
  ...workboxOptions,
};

module.exports = [withOffline, withBundleAnalyzer].reduce((tmp, fn) => (tmp == null ? fn(nextOptions) : fn(tmp)), null);
