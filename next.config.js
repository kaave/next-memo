/* eslint-disable no-param-reassign */

const path = require('path');
const dotenv = require('dotenv');
const DotenvWebpack = require('dotenv-webpack');
const withOffline = require('next-offline');
// const withSass = require('@zeit/next-sass');
const packageImporter = require('node-sass-package-importer');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const withOptimizedImages = require('next-optimized-images');

const withSass = require('./tools/with-scss');

dotenv.config();

function webpack(config, options) {
  config.resolve = config.resolve || {};
  config.resolve.plugins = config.resolve.plugins || [];

  config.resolve.plugins.push(new TsconfigPathsPlugin());

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

const optimizedImagesOptions = {
  mozjpeg: {
    quality: 80,
  },
  pngquant: {
    quality: [0.65, 0.8],
  },
};

const workboxOptions = {};

const nextOptions = {
  webpack,
  ...cssModulesOptions,
  ...analyzerOptions,
  ...optimizedImagesOptions,
  ...workboxOptions,
};

module.exports = [withSass, withOptimizedImages, withOffline, withBundleAnalyzer].reduce(
  (tmp, fn) => (tmp == null ? fn(nextOptions) : fn(tmp)),
  null,
);
