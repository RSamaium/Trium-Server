module.exports = function(app) {
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    if (['development', 'test'].indexOf(app.get('env')) != -1) {

      app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
          name: err.name,
          message: err.message,
          error: err.stack
        });
      });
    }

    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: {}
      });
    });

    return app;
}
