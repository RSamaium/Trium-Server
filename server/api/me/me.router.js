const express = require('express');
const defineRestRoutes = require('../../core/route');
const model = require("../../core/Model");

module.exports = function(app) {

    let me = model('User', 'Me', app),
        router = express.Router();

    require("./middlewares/session")(app);
    require("./middlewares/passport")(app);
    let passport = require("./middlewares/passport-strategies/local")(app);

    router.post('/forgotten-password', me.forgottenPassword.bind(me));
    router.post('/reset-password', me.resetPassword.bind(me));
    router.post('/enable', me.enable.bind(me));

    router.post('/login', passport.authenticate('local'), function(req, res, next) {
       res.json(req.user);
    });

    defineRestRoutes(router, me, req => {
        if (req.user) {
            return req.user._id;
        }
    });

    app.use('/api/me', router);

    return app;

}
