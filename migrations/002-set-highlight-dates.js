'use strict';

var mongoose = require('mongoose-bird')();
var config = require('../server/config/environment/development');
var User = require('../server/api/user/user.model');

exports.up = function(next){
  mongoose.connect(config.mongo.uri, { db: { safe: true } });
  User.findAsync().then(function (users) {
    Promise.all(users.map(function (user) {
      return user.saveAsync();
    })).then(function () {
      mongoose.disconnect();
      next();
    });
  });
};

exports.down = function(next){
  next();
};
