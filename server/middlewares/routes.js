const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const _ = require("lodash");
const config = require('../config');

module.exports = function(app) {


    const apiPath = '../api';
    const root = path.join(__dirname, apiPath);

    let  _path, schema, modelName, mongooseModel,
        folders = fs.readdirSync(root);

    app.Models = {};

    for (let folder of folders) {
        _path =`/${folder}/${folder}.model`;
        if (fs.existsSync(root + _path + ".js")) {
            schema = require(apiPath + _path)(app);
            modelName = _.upperFirst(folder);
            mongooseModel =  mongoose.model(modelName, schema);
            app.Models[modelName] = mongooseModel;
            app.set(`Model.${modelName}`, mongooseModel);
        }
    }

    for (let folder of folders) {
        _path =`/${folder}/${folder}.router`;
        if (fs.existsSync(root + _path + ".js")) {
            require(apiPath + _path)(app);
        }
    }

    app.all('/*', function(req, res) {
        res.sendfile(config.get('paths', 'contentPath') + '/index.html');
    });

    return app;
}
