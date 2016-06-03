'use strict';

var mongoose = require('mongoose-bird')();
var config = require('../server/config/environment/' + (process.env.NODE_ENV || 'development'));
var User = require('../server/api/user/user.model');

exports.up = function(next){
  mongoose.connect(config.mongo.uri, { db: { safe: true } });
  User.findAsync().then(function (users) {
    Promise.all(users.map(function (user) {
      user.highlights.forEach(function (highlight) {
        highlight._id = new mongoose.Types.ObjectId();
      });
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
