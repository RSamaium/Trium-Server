const crypto = require('crypto');

module.exports.uniqId = () => {
  return crypto.createHash('md5').update("" + Date.now() + Math.random()).digest('hex');
}
