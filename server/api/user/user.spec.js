const {expect} = require('chai');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const {log} = require('../../core/test');
const API = '/api';

const User = app.get('Model.User');

describe('User Test', function() {

  let userId;

  before(done => {
    User.remove({}, done);
  });

  it('POST /users', done => {
    request(app)
      .post(`${API}/users`)
      .send({
        username: 'Sam',
        email: 'yoyo@yoyo.fr',
        password: 'azerty'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        log(err, res, done, data => {
          expect(data.username).to.equal('Sam');
          expect(data.password).to.not.equal('azerty');
          userId = data._id;
        });
      });
  });

  it('GET /users/:id', done => {
    request(app)
      .get(`${API}/users/${userId}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        log(err, res, done, data => {
          expect(data.password).to.be.undefined;
        });
      });
  });

  it('GET /users', done => {
    request(app)
      .get(`${API}/users`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        log(err, res, done, data => {
          expect(data).to.have.lengthOf(1);
        });
      });
  });

  it('PUT /users/:id', done => {
    request(app)
      .put(`${API}/users/${userId}`)
      .send({
        username: 'Jim'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        log(err, res, done, data => {
          expect(data.username).to.equal('Jim');
        });
      });
  });

  it('DELETE /users/:id', done => {
    request(app)
      .delete(`${API}/users/${userId}`)
      .expect(204)
      .end(function(err, res) {
        log(err, res, done);
      });
  });

});
