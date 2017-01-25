'use strict'

const express  = require("express");
const _ = require("lodash");
const mongo = require('./mongo');
const Languages = require('languages-js')

var app = express();

mongo(app);

Languages.all(`${__dirname}/languages/`)

const options = []

_.each(
    [
        "letsencrypt",
        "access-control",
        "main",
        "token",
        "routes",
        ...options,
        "errors"

    ], function(middleware) {
    require("./middlewares/" + middleware)(app);
});


module.exports = app;
