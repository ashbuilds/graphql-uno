const { resolve } = require('path');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');

const ENTRY_PATH = resolve(__dirname, './index.js');
const SCHEMA_PATH = resolve(__dirname, './schema/**/*');
const DIRECTIVES_PATH = resolve(__dirname, './directives/**/*');

const WATCH_OPTIONS = {
  poll: 500,
  aggregateTimeout: 300,
};

module.exports = {
  webpack: (config) => {
    config.entry.main = [
      ENTRY_PATH,
    ];

    config.plugins.push(
      new ExtraWatchWebpackPlugin({
        files: [
          SCHEMA_PATH,
          DIRECTIVES_PATH,
        ],
      }),
    );

    config.watchOptions = WATCH_OPTIONS;
    return config;
  },
};
