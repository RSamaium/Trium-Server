const validate = require("../../validates");
const uniqid = require('uniqid');
const config = require('../../config');

module.exports = function(app) {

    return {
        username: {
            type: String
        },
        email: {
            type: String,
            required: true,
            validate: []
                .concat(validate.isEmail())
        },
        password: {
            type: String,
            required: true,
            hash: true
        },
        enabled: {
            type: Boolean,
            default: config.userActivation != 'email'
        },
        registered: {
            type: Date,
            default: Date.now,
        },
        lang: {
          type: String,
          default: 'en_EN'
        }
    }

}
