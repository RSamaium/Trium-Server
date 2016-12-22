const mongoose = require("mongoose");
const _ = require("lodash");
const config = require("./config");

module.exports = function(app) {

  app = app || {};

  const {
      client,
      host,
      db,
      port,
      password,
      username
    } = config.get('database');

  let str = client + "://";
  if (password) {
      str += username + ":" + password + "@";
  }
  str += host;
  if (port) {
      str += ":" + port;
  }
  str += "/" + db;

  mongoose.connect(str, function(err) {
      if (err) {
          console.log(err);
      }
      else {
          console.log("-> Connecting to the " + db +  " database : success");
      }
  });

};
