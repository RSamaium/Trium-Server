const colors = require('colors');

module.exports.log = function(err, res, done, cb) {

  cb = cb || (new Function())

  return new Promise((resolv, reject) => {
    if (err) {
      if (res.status == 500) {
        let err = new Error();
        err.name = res.body.name,
        err.message = res.body.message,
        err.stack = res.body.error
        reject(err)
      }
      else
        reject(err);
      return;
    }
    resolv(res.body);
  })
  .then(cb)
  .then(done)
  .catch(done);
}
