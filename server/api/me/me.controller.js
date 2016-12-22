"use strict";

const UserController = require("../user/user.controller");
const jwt    = require('jsonwebtoken');
const _    = require('lodash');


class MeController extends UserController {

     login(username, password, done) {

        this.getEntity().findOne({ email: username },  (err, user) => {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            var token = jwt.sign(user.toObject(), this.app.get('tokenSecret'), {
               expiresInMinutes: 1440
            });

            return done(null, {
                _id: user._id,
                token
            });
        });
     }

     setSession(user, done) {
        delete user.password;
        done(null, user._id);
     }

     getSession(id, done) {
         this.getEntity().findById(id).select("-password").exec(function (err, user) {
            if (err) { return done(err); }
            return done(null, user);
        });
     }

     isAuthenticated(req, res, next) {
        if (req.user) {
            return next();
        }
        else {
            next(new Error("not auth"));
        }
     }


     permission(req) {

        return {
            "*": function(entity, user) {
                if (!user) {
                    return "Unauthorized";
                }
                if (""+user._id != ""+entity._id) {
                    return "Is not your profile";
                }
                if (!user.enabled) {
                    return "Is not enabled";
                }
                return true;
            },
            "PUT": function(entity, user) {
                if (user.role == 'admin') {
                  return true;
                }
                return ['role', 'enabled'];
            },
            "POST": function(entity, user) {
                return false;
            },
            "DELETE": function(entity, user) {
                return false;
            }
        }
    }

}

module.exports = MeController;
