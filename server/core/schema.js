const mongoose = require("mongoose");
const bcrypt   = require('bcrypt-nodejs');
const validator   = require('validator');

module.exports = function(schemaObj, app) {

    let obj = schemaObj(app);
    let schema = mongoose.Schema(obj);

    schema.methods._schema = function() {
        return obj;
    };

    schema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    schema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    };

    schema.pre("save", function(next) {
        var val, sanitize;
        for (var key in this) {
            val = this[key];

            if (!obj[key]) continue;
            if (obj[key] && val === undefined) continue;

            if (obj[key].hash) {
                 this[key] = schema.methods.generateHash(val);
            }

            if (!obj[key].sanitize) continue;
            sanitize = obj[key].sanitize;

            if (sanitize.normalizeEmail) {
                 this[key] = validator.normalizeEmail(val);
            }
            if (sanitize.whitelist) {
                 this[key] = validator.whitelist(val, sanitize.whitelist);
            }
            if (sanitize.rtrim) {
                 this[key] = validator.rtrim(val, sanitize.rtrim);
            }
            if (sanitize.ltrim) {
                 this[key] = validator.ltrim(val, sanitize.ltrim);
            }
            if (sanitize.trim) {
                 this[key] = validator.trim(val, sanitize.trim);
            }
            if (sanitize.escape) {
                 this[key] = validator.escape(val);
            }
            if (sanitize.stripLow) {
                this[key] = validator.stripLow(val, sanitize.stripLow);
            }
        }
        next();
    });

    return schema;

};
