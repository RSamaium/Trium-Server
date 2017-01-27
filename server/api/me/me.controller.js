"use strict";

const UserController = require("../user/user.controller");
const jwt    = require('jsonwebtoken');
const _    = require('lodash');
const Email = require('../../services/email');
const config = require('../../config');
const error = require('../../errors');

class MeController extends UserController {

     login(username, password, done) {
        if (!username) {
          done(new error.NotFoundError('Username not found'))
          return;
        }
        this.getEntity().findOne({ email: username }, (err, user) => {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            delete user.password;
            var token = jwt.sign(user.toObject(), this.app.get('tokenSecret'));
            return done(null, {
                _id: user._id,
                token
            });
        });
     }

     loginTo(platform) {
       const User = this.getEntity();
       const connect = (token, profile, done) => {
         let {id, email, username} = profile;
         if (!id) {
           done(new error.NotFoundError('User not found'))
           return;
         }
         User.findOne({ [`platforms.${platform}.id`]: id }, '-password').then(user => {
           if (!user) {
             user = new User();
             user.email = email;
             user.username = username;
             user.password = Math.random();
             user.platforms.facebook = { token, id }
             if (this.save) this.save(user);
             return user.save()
           }
           return user;
         }).then(user => {
           let appToken = jwt.sign(user.toObject(), this.app.get('tokenSecret'));
           return done(null, {
               _id: user._id,
               token: appToken
           });
         }).catch(done)
       }

       return (accessToken, refreshToken, profile, cb) => {
         if (platform == 'facebook') {
           connect(accessToken, profile, cb)
         }
       }
     }

     forgottenPassword(req, res, next) {
       let {email} = req.body;
       this.getEntity().findOne({ email }).then(user => {
         if (!user) {
           throw new error.NotFoundError("User not found");
         }
         return jwt.sign({ email, _id: user._id }, config.get('token', 'resetPassword'), { expiresIn: '2h' });
       }).then(key => {
         return Email.send({
           template: {
             name: 'forgotten-password.pug',
             data: {
               url: `${config.url}/reset-password?key=${key}`
             }
           },
           to: email,
           subject: `${config.name} - ${'reset password'.t()}`
         })
       }).then(ret => {
         res.status(204).end();
       }).catch(next)
     }

     updateWithKey(keyName, schema, req, res, next) {
       const {key} = req.body;

       jwt.verify(key, config.get('token', keyName), (err, decoded) => {
         if (err) {
           return next(err);
         } else {
           this.getEntity().findByIdAndUpdate(decoded._id, schema).then(ret => {
             if (!ret) {
               throw new error.NotFoundError("User not found");
             }
             res.status(204).end();
           }).catch(next)
         }
       });
     }

     resetPassword(req, res, next) {
       this.updateWithKey('resetPassword', {password: req.body.password}, req, res, next)
     }

     enable() {
       this.updateWithKey('enable', {enabled: true}, req, res, next)
     }

     setSession(user, done) {
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
