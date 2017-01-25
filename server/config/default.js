const path = require('path');

module.exports = {
  token: {
    secret: 'helloworld',
    resetPassword: 'helloworld',
    enable: 'helloworld'
  },
  url: 'http://localhost:8080',
  mail: {},
  database: {
      client: 'mongodb',
      host: 'localhost',
      db: 'dev',
      password: '',
      username: ''
  },
  mailgun: {
      from: 'Trium <sam@webcreative5.net>',
      apiKey: 'key-f3ddef4faf6985aeb81a02b6d8995d26',
      domain: 'sandboxa1ced1d8dfd94576a3ac3e7875138b56.mailgun.org'
  },
  server: {
      host: '127.0.0.1',
      port: '7000'
  },
  paths: {
      contentPath: path.join(__dirname, '../../client/static')
  },
  userActivation: 'auto'
}
