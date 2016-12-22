module.exports = function({name, path, upperName}) {

return `const ${name}Schema = require("./${name}.schema");
const Schema = require("../../core/schema");

module.exports = function(app) {

    let schema = Schema(${name}Schema, app);

    return schema;

}`

}
