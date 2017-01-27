const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;


module.exports = function(app) {

    passport.use('local', new LocalStrategy(app.Me.login.bind(app.Me)));

    return passport;
};
