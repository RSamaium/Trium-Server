const validator = require("validator");

module.exports =  {

     _common: function(validator, msg) {
         msg = msg || "";
         return [
              {
                  validator: validator,
                  msg: msg
              }
             ];

     },

    isEmail: function(msg) {
        msg = msg || "This is not an email";
        return this._common(function(value) {
            return validator.isEmail(value);
        }, msg);
    },


    isURL: function(msg) {
        msg = msg || "This is not an url";
        return this._common(function(value) {
            return validator.isURL(value);
        }, msg);
    },

    isHexColor: function(msg) {
        msg = msg || "This is not a color";
        return this._common(function(value) {
            return validator.isHexColor(value);
        }, msg);
    }
}
