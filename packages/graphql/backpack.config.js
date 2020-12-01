const { resolve } = require('path');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

const ENTRY_PATH = resolve(__dirname, './index.js');
const TYPES_PATH = resolve(__dirname, './types/*.graphql');
const RESOLVERS_PATH = resolve(__dirname, './resolvers/*.js');

const WATCH_OPTIONS = {
  poll: 500,
  aggregateTimeout: 300,
};

module.exports = {
  webpack: (config, options, webpack) => {

    config.entry.main = [
      ENTRY_PATH,
    ]

    config.plugins.push(
        new ExtraWatchWebpackPlugin({
          files: [
            TYPES_PATH,
            RESOLVERS_PATH,
          ],
        }),
    );

    config.watchOptions = WATCH_OPTIONS;
    return config;
  },
};
