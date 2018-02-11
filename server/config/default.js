const path = require('path');

const URL = 'http://localhost:3000';

module.exports = {
  token: {
    secret: 'helloworld',
    resetPassword: 'helloworld',
    enable: 'helloworld'
  },
  url: URL,
  mail: {},
  auth: {
    facebook:{
      clientID: '',
      clientSecret: '',
      callbackURL: `${URL}/api/me/login/facebook/callback`
    }
  },
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
  },
  userActivation: 'auto'
}
