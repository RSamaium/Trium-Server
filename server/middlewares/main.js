const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../config');

module.exports = function(app) {

    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(express.static(config.get('paths', 'contentPath')));

    let getImg = (req, res, next) => {
      var p = path.join(__dirname, `../uploads/${res.params.dir}/${req.params.file}`);
      res.sendFile(p);
    }

    app.get("/uploads/:dir/:file", getImg);

    return app;
}
