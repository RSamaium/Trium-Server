const express = require('express');
const config = require('../config');

module.exports = function(app) {

    app.get('/.well-known/*', express.static(config.get('paths', 'contentPath')));
    return app;
}
