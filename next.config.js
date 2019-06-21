const withOffline = require('next-offline');
const withTypescript = require('@zeit/next-typescript');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withSass = require('@zeit/next-sass');
const packageImporter = require('node-sass-package-importer');

function webpack(config, options) {
  if (options.isServer) {
    config.plugins.push(new ForkTsCheckerWebpackPlugin());
  }

  return config;
}

const cssModulesOptions = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  importer: packageImporter(),
};

const workboxOptions = {
  registerSwPrefix: '/_next/static',
  workboxOpts: {
    swDest: 'static/service-worker.js',
  },
};

const nextOptions = {
  webpack,
  ...cssModulesOptions,
  ...workboxOptions,
};

module.exports = [withOffline, withTypescript, withSass].reduce(
  (tmp, fn) => (tmp == null ? fn(nextOptions) : fn(tmp)),
  null,
);
