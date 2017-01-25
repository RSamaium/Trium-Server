const _ = require('lodash');
const production = require('./production');
const test = require('./test');
const _default = require('./default');
const package = require('../../package.json');

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development'

const env = process.env.NODE_ENV;
const config = {
  _default,
  production,
  test,
  development: _default
}

let configObj = config._default;

if (config[env]) {
  configObj = _.merge(configObj, config[env]);
}

configObj = _.merge(configObj, package)

configObj.get = function(...keys) {
  return _.get(configObj, keys) || {}
}


module.exports = configObj;
