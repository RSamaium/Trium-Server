const request = require('supertest');
const { expect } = require('chai');
const colors = require('colors');
const _ = require('lodash');
const Faker = require('faker');
const log = require('./log');
const { Error403 } = require('./errors');
const config = require('../../config');
const API = '/api';

class TestRest {
  constructor(app, uri, options = {}) {
    this._uri = uri;
    this.app = app;
    this.options = options;
    if (_.isUndefined(this.options.id)) {
      this.options.id = true;
    }
  }
  setUri(uri) {
    this._uri = uri;
  }
  setId(id) {
    this._id = id;
  }
  get uri() {
    return API + this._uri;
  }
  get token() {
    return this._token;
  }
  get me() {
    return this._me;
  }

  createUser(model) {
    let email
    if (config.mailgun) {
      email = config.mailgun.to
    }
    else {
      email = 'c0b17f32e6384d7cd46@yopmail.com'
    }

    model = model || this.app.get('Model.User');

    let user = new model();
    user.password = '4Rz8Z9jxRMr1Mp';
    user.email = email;
    user.username = 'username';

    before(done => {
      model.remove({}, done);
    });

    before(done => {
      user.save(done);
    });
    return user
  }

  logout() {
    this._token = null;
  }
  login(model) {

    const { email } = this.createUser(model)

    it('Login', done => {
      request(this.app)
        .post(`${API}/me/login`)
        .send({
          password: '4Rz8Z9jxRMr1Mp',
          username: email
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          log(err, res, done, data => {
            expect(data).to.have.property('token');
            this._token = data.token;
          });
        });
    });
  }
  loginAndMe(model) {
    this.login(model);
    it('GET /me', done => {
      request(this.app)
        .get(`${API}/me`)
        .set('x-access-token', this._token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          log(err, res, done, data => {
            this._me = data;
          });
        });
    });
  }
  _common(method, obj) {
    let uri = `${API}${this._uri}`;
    if (this.options.id && ['get', 'put', 'delete'].indexOf(method) != -1) {
      let id = this._id;
      uri += `/${id}`;
    }
    if (method == 'query') {
      method = 'get';
    }
    let r = request(this.app)[method](uri);

    if (this._token) {
      r.set('x-access-token', this._token);
    }

    if (obj) {
      r.send(obj);
    }

    if (method != 'delete') {
      r.expect('Content-Type', /json/);
    }

    return r;
  }
  post(obj) {
    return this._common('post', obj);
  }
  get() {
    return this._common('get');
  }
  query() {
    return this._common('query');
  }
  put(obj) {
    return this._common('put', obj);
  }
  delete() {
    return this._common('delete');
  }
  allForbidden() {

    it(`POST ${this._uri}`, done => {
      Error403(this.post(), done);
    });

    it(`GET ${this._uri}/:id`, done => {
      Error403(this.get(), done);
    });

    it(`GET ${this._uri}`, done => {
      Error403(this.query(), done);
    });

    it(`PUT ${this._uri}/:id`, done => {
      Error403(this.put(), done);
    });

    it(`DELETE ${this._uri}/:id`, done => {
      Error403(this.delete(), done);
    });
  }
  tests(schema) {

    let schemaPost = {};
    let schemaPut = {};

    before(() => {
      for (let key in schema) {
        let { type, canChange, value } = schema[key];
        let faker = _.get(Faker, type)
        if (faker) {
          schemaPost[key] = faker();
          if (canChange) {
            schemaPut[key] = faker();
          }
        }
        else if (type == 'get') {
          schemaPost[key] = _.get(this, value);
          if (canChange) {
            schemaPut[key] = _.get(this, value);
          }
        }
      }
    });

    function loopExpect(data) {
      for (let key in data) {
        if (schemaPost[key]) {
          expect(data[key]).to.equal(schemaPost[key]);
        }
      }
    }

    it(`POST ${this._uri}`, done => {
      console.log('POST', JSON.stringify(schemaPost).yellow)
      this.post(schemaPost)
        .expect(200)
        .end((err, res) => {
          log(err, res, done, data => {
            loopExpect(data);
            this.setId(data._id);
          });
        });
    });

    it(`GET ${this._uri}/:id`, done => {
      this.get()
        .expect(200)
        .end(function (err, res) {
          log(err, res, done, loopExpect);
        });
    });

    it(`GET ${this._uri}`, done => {
      this.query()
        .expect(200)
        .end(function (err, res) {
          log(err, res, done, data => {
            loopExpect(data[0]);
          });
        });
    });

    it(`PUT ${this._uri}/:id`, done => {
      console.log('PUT', JSON.stringify(schemaPut).yellow)
      this.put(schemaPut)
        .expect(200)
        .end(function (err, res) {
          log(err, res, done, data => {
            for (let key in data) {
              if (schemaPut[key]) {
                expect(data[key]).to.equal(schemaPut[key]);
              }
            }
          });
        });
    });


    it(`DELETE ${this._uri}/:id`, done => {
      this.delete()
        .expect(204)
        .end(function (err, res) {
          log(err, res, done);
        });
    });
  }
}

module.exports = TestRest;
