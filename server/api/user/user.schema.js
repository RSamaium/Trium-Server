const validate = require("../../validates");

module.exports = function(app) {

    return {
        username: {
            type: String,
            required: true,

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
            hash: true,

        },
        enabled: {
            type: Boolean,
            default: true
        },
        activation_key: {
            type: String
        },
        registered: {
            type: Date,
            default: Date.now,
        }
    }

}
