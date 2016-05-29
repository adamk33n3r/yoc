'use strict';

var mongoose = require('mongoose-bird')();
var config = require('../server/config/environment/development');
var User = require('../server/api/user/user.model');

exports.up = function(next){
  mongoose.connect(config.mongo.uri, { db: { safe: true } });
  Promise.all([
    User.findOneAsync({ email: 'adamk33n3r@gmail.com' }).then(function (user) {
      if (!user) return;
      user.highlights.push({
        title: 'Junkrat POTG',
        name: 'SadTastyHarborporpoise'
      });
      user.highlights.push({
        title: 'Tracer POTG',
        name: 'GlaringReasonableBongo'
      });
      return user.saveAsync();
    })
  ,
    User.findOneAsync({ email: 'foos182@gmail.com' }).then(function (user) {
      if (!user) return;
      user.highlights.push({
        title: 'First good Junkrat tire multikill',
        name: 'MelodicAromaticArizonaalligatorlizard'
      });
      return user.saveAsync();
    })
  ]).then(function () {
    mongoose.disconnect();
    next();
  });
};

exports.down = function(next){
  console.log('down');
  mongoose.connect(config.mongo.uri, { db: { safe: true } });
  Promise.all([
    User.findOneAsync({ email: 'adamk33n3r@gmail.com' }).then(function (user) {
      if (!user) return;
      user.highlights = [];
      return user.saveAsync();
    })
  ,
    User.findOneAsync({ email: 'foos182@gmail.com' }).then(function (user) {
      if (!user) return;
      user.highlights = [];
      return user.saveAsync();
    })
  ]).then(function () {
    mongoose.disconnect();
    next();
  });
};
