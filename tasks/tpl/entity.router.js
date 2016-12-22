module.exports = function({name, path, upperName, plurial}) {

return `const express = require('express');
const defineRestRoutes = require('../../core/route');
const model = require("../../core/Model");

module.exports = function(app) {

  let ${name} = model("${upperName}", app),
      router = express.Router();

  defineRestRoutes(router, ${name}, '${name}_id');

  app.use('/api/${plurial}', router);

  return app;
}`

}
