const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { log, errors, TestRest } = require('../../core/test');
const _ = require('lodash');

const { Error403 } = errors;
const API = '/api';
const User = app.get('Model.User');

describe('User Test', function () {

  let userId;
  let rest = new TestRest(app, '/users');

  before(done => {
    User.remove({}, done);
  });

  let obj = {
    username: 'Sam',
    email: 'yoyo@yoyo.fr',
    password: 'azerty'
  }

  function its() {
    it('POST /users', done => {
      rest.post(obj)
        .expect(200)
        .end(function (err, res) {
          log(err, res, done, data => {
            expect(data.username).to.equal(obj.username);
            expect(data.email).to.equal(obj.email);
            expect(data.enabled).to.be.true;
            expect(data.password).to.not.equal(obj.password); // password is hashed
            rest.setId(data._id);
          });
        });
    });

    it('POST /users but try to modify `enabled` property', done => {
      rest.post(_.merge(obj, {
        enabled: false
      }))
        .expect(200)
        .end(function (err, res) {
          log(err, res, done, data => {
            expect(data.username).to.equal(obj.username);
            expect(data.email).to.equal(obj.email);
            expect(data.enabled).to.be.true;
          });
        });
    });

    it('GET /users/:id', done => {
      Error403(rest.get(), done);
    });

    it('GET /users', done => {
      Error403(rest.query(), done);
    });

    it('PUT /users/:id', done => {
      Error403(rest.put(), done);
    });

    it('DELETE /users/:id', done => {
      Error403(rest.delete(), done);
    });
  }

  describe('no connected', function () {
    its();
  });

  describe('connected', function () {
    rest.login();
    its();
    after(() => {
      rest.logout();
    });
  });

});
