const path = require('path');

module.exports = {
  token: {
    secret: '',
    resetPassword: '',
    enable: ''
  },
  url: 'http://localhost:3000',
  mail: {},
  database: {
      client: 'mongodb',
      host: 'localhost',
      db: 'dev',
      password: '',
      username: ''
  },
  mailgun: {
      from: '',
      apiKey: '',
      domain: ''
  },
  server: {
      host: '127.0.0.1',
      port: '7000'
  },
  paths: {
      contentPath: path.join(__dirname, '../../client/static')
  },
  userActivation: 'auto' // email, admin or auto
}
