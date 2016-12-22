const express = require('express');
const defineRestRoutes = require('../../core/route');
const model = require("../../core/Model");

module.exports = function(app) {

  let user = model("User", app),
      router = express.Router();


  defineRestRoutes(router, user, "user_id");

  app.use('/api/users', router);

  return app;
}
