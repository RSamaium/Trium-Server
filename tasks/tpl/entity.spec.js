module.exports = function({name, path, upperName, plurial}) {

return `const {expect} = require('chai');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const {log} = require('../../core/test');
const API = '/api';

const ${upperName} = app.get('Model.${upperName}');

describe('${upperName} Test', function() {

  let ${name}Id;

  before(done => {
    ${upperName}.remove({}, done);
  });

  it('POST /${plurial}', done => {
    request(app)
      .post(\`\${API}/${plurial}\`)
      .send({
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        log(err, res, done, data => {
          // expect().to.equal();
          ${name}Id = data._id;
        });
      });
  });

  it('GET /${plurial}/:id', done => {
    request(app)
      .get(\`\${API}/${plurial}/\${${name}Id}\`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        log(err, res, done, data => {
          // expect().to.be.undefined;
        });
      });
  });

  it('GET /${plurial}', done => {
    request(app)
      .get(\`\${API}/${plurial}\`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        log(err, res, done, data => {
          expect(data).to.have.lengthOf(1);
        });
      });
  });

  it('PUT /${plurial}/:id', done => {
    request(app)
      .put(\`\${API}/${plurial}/\${${name}Id}\`)
      .send({

      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        log(err, res, done, data => {
          // expect().to.equal();
        });
      });
  });

  it('DELETE /${plurial}/:id', done => {
    request(app)
      .delete(\`\${API}/${plurial}/\${${name}Id}\`)
      .expect(204)
      .end(function(err, res) {
        log(err, res, done);
      });
  });

});`;

}
