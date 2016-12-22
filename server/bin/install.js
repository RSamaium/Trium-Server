const express  = require("express");
const _ = require("lodash");
const mongo = require('../mongo');
const path = require('path');
const mongoose = require('mongoose');

var app = express();

mongo(app);

var userSchema = require(path.join(__dirname, '../api/user/user.schema'));
var userModel = mongoose.model('User', userSchema());

var user = new userModel();

user.save(function(err, ret) {
  console.log(err || ret);
});
