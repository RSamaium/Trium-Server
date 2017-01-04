'use strict'

var express  = require("express");
var _ = require("lodash");
var mongo = require('./mongo');

var app = express();

mongo(app);

_.each(
    [
        "letsencrypt",
        "access-control",
        "main",
        "token",
        "routes",
        "renderer",
        "errors"

    ], function(middleware) {
    require("./middlewares/" + middleware)(app);
});



module.exports = app;
