const passport = require("passport");
const config = require('../../../../config');
const {Strategy} = require('passport-facebook');


module.exports = function(app) {

    let {facebook} = config.get('auth')
    if (!facebook.profileFields) facebook.profileFields = [];
    if (facebook.profileFields.indexOf('email') == -1) {
      facebook.profileFields.push('email');
    }
    passport.use('facebook', new Strategy(facebook, app.Me.loginTo('facebook')));

    return passport;
};
