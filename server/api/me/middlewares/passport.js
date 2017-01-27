const passport = require("passport");

module.exports = function(app) {

    app.use(passport.initialize());
    
    passport.serializeUser(app.Me.setSession.bind(app.Me));
    passport.deserializeUser(app.Me.getSession.bind(app.Me));
    passport.isAuthenticated = app.Me.isAuthenticated.bind(app.Me);

}
