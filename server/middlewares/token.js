const jwt = require('jsonwebtoken');
const express = require('express');
const error = require('../errors');
const config = require('../config');


module.exports = function(app) {

    app.set("tokenSecret", config.get('token', 'secret'));
    app.use(function(req, res, next) {

      var token = req.headers['x-access-token'];

      if (token) {

        jwt.verify(token, app.get('tokenSecret'), function(err, decoded) {
          if (err) {
            return next(err);
          } else {
            req.user = decoded;
            next();
          }
        });

      } else {

        next();

      }
    });

}
