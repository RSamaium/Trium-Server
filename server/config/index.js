const _ = require('lodash');
const production = require('./production');
const test = require('./test');
const _default = require('./default');
const env = process.env.NODE_ENV;

const config = {
  _default,
  production,
  test
}

let configObj = config._default;

if (config[env]) {
  configObj = _.merge(configObj, config[env]);
}

configObj.get = function(...keys) {
  return _.get(configObj, keys) || {}
}

module.exports = configObj;
