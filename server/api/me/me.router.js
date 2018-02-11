const express = require('express');
const defineRestRoutes = require('../../core/route');
const model = require("../../core/Model");
const passport = require("passport");

module.exports = function(app) {

    let me = model('User', 'Me', app),
        router = express.Router();

    require("./middlewares/passport")(app);
    require("./middlewares/passport-strategies/local")(app);
    //require("./middlewares/passport-strategies/facebook")(app);

    router.post('/forgotten-password', me.forgottenPassword.bind(me));
    router.post('/reset-password', me.resetPassword.bind(me));
    router.post('/enable', me.enable.bind(me));

    router.post('/login', passport.authenticate('local'), function(req, res, next) {
       res.json(req.user);
    });

    router.get('/login/facebook', passport.authenticate('facebook'));
    router.get('/login/facebook/callback', passport.authenticate('facebook'), function(req, res) {
      let {error, error_description} = req.query;
      if (error) {
        let _error = new Error()
        _error.message = error_description;
        _error.name = error;
        next(_error)
      }
      else {
        res.json(req.user);
      }
    });

    defineRestRoutes(router, me, req => {
        if (req.user) {
            return req.user._id;
        }
    });

    app.use('/api/me', router);

    return app;

}
