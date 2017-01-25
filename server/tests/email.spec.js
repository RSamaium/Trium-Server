const {expect} = require('chai');
const app = require('../app');
const Email = require('../services/email');

describe('Email Test', function() {

  it('To MJML', done => {
    Email.mjml2html('welcome.pug', {activation: true}, 'fr_FR').then(html => {
      expect(html).to.be.a('string');
      done();
    }).catch(done)
  })

  it('Send', done => {
    Email.send({
      template: {
        name: 'welcome.pug',
        data: {
          activation: true
        }
      },
      subject: 'Welcome'
    }).then(ret => {
      expect(ret).to.have.property('id');
      done();
    }).catch(done)
  })


})
