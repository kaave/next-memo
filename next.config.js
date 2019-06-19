/* eslint-disable import/no-extraneous-dependencies */
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

module.exports = withTypescript(
  withSass({
    webpack(config) {
      return config;
    },
  }),
);
