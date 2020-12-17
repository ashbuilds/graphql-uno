// eslint-disable-next-line import/no-commonjs
const Hashids = require('hashids/cjs'); // Issue: https://github.com/niieani/hashids.js/issues/73

const {
  HASH_CODE = 'default_salt',
} = process.env;

module.exports = new Hashids(HASH_CODE, 5, 'abcdefghijklmnopqrstuvwxyz1234567890');
