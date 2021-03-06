const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { log, errors, TestRest } = require('../../core/test');
const config = require('../../config');
const _ = require('lodash');

const { Error403, Error400 } = errors;
const User = app.get('Model.User');

describe('Me Test', function () {

  let rest = new TestRest(app, '/me', { id: false });

  describe('no connected', function () {

    rest.createUser()

    it('GET /me', done => {
      Error400(rest.get(), done);
    });

    it('POST /forgotten-password', done => {
      request(app)
        .post(`${rest.uri}/forgotten-password`)
        .send({
          email: 'c0b17f32e6384d7cd46@yopmail.com'
        })
        .expect(204)
        .end(function (err, res) {
          log(err, res, done);
        });

    });

  });

  describe('connected', function () {

    rest.login();

    it('GET /me', done => {
      rest.get()
        .expect(200)
        .end(function (err, res) {
          log(err, res, done, data => {
            expect(data).to.have.property('username');
          });
        });
    });



  });

});
