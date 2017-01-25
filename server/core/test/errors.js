const log = require('./log');

module.exports = {
  Error403: function(request, done) {
    request
      .expect(403)
      .end(function(err, res) {
        log(err, res, done)
      });
  },
  Error400: function(request, done) {
    request
      .expect(400)
      .end(function(err, res) {
        log(err, res, done);
      });
  }
}
