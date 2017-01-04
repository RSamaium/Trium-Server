const path = require('path');

module.exports = {
  token: {
    secret: 'helloworld'
  },
  url: '',
  mail: {},
  database: {
      client: 'mongodb',
      host: 'localhost',
      db: 'dev',
      password: '',
      username: ''
  },

  server: {
      host: '127.0.0.1',
      port: '7000'
  },
  paths: {
      contentPath: path.join(__dirname, '../../client/static')
  }
}
