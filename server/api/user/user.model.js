const userSchema = require("./user.schema")
const Schema = require("../../core/schema")

module.exports = function(app) {
    const schema = Schema(userSchema, app)
    return schema
}
