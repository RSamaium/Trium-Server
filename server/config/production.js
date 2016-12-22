const path = require('path');

module.exports = {
  database: {
      db: 'prod',
      password: '',
      username: ''
  },
  paths: {
      contentPath: path.join(__dirname, '../../dist')
  }
}
