// original: https://github.com/zeit/next-plugins/blob/0735096aa72354b79807972132e88d042be8ed14/packages/next-sass/index.js

const cssLoaderConfig = require('@zeit/next-css/css-loader-config');

module.exports = (nextConfig = {}) => ({
  ...nextConfig,
  ...{
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
        );
      }

      const { dev, isServer } = options;
      const { cssModules, cssLoaderOptions, postcssLoaderOptions, sassLoaderOptions = {} } = nextConfig;
      const cssLoaderConfigOptions = {
        extensions: ['scss', 'sass'],
        cssModules,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'sass-loader',
            options: sassLoaderOptions,
          },
        ],
      };

      console.log(cssLoaderConfig(config, { ...cssLoaderConfigOptions, ...cssLoaderOptions }));
      config.module.rules.push({
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: cssLoaderConfig(config, { ...cssLoaderConfigOptions, cssLoaderOptions: { modules: false } }),
          },
          { use: cssLoaderConfig(config, { ...cssLoaderConfigOptions, ...cssLoaderOptions }) },
        ],
      });

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  },
});
