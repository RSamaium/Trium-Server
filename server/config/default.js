const path = require('path');

const URL = 'http://9365eb99.ngrok.io';

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
      clientID: '586019424873205',
      clientSecret: 'e38e8fab94dd29fedbd16fa718040172',
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
