module.exports = function({name, path, upperName}) {

return `const Controller = require("../../core/Controller");

class ${upperName}Controller extends Controller {


}

module.exports = ${upperName}Controller;`

}
