var passport = require("passport");

module.exports = function(app) {
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(app.Me.setSession.bind(app.Me));
    passport.deserializeUser(app.Me.getSession.bind(app.Me));
    passport.isAuthenticated = app.Me.isAuthenticated.bind(app.Me);

}
