'use strict';

var express = require('express');

var email = require('./email');
var slack = require('./slack');
var teamspeak = require('./teamspeak');
var minecraft = require('./minecraft');
// var steam = require('./steam');
var rocketleague = require('./rocketleague');
var stream = require('./stream');

var router = express.Router();

module.exports = function (socketio) {
  router.use('/email', email);
  router.use('/slack', slack);
  router.use('/teamspeak', teamspeak);
  router.use('/minecraft', minecraft);
  // router.use('/steam', steam);
  router.use('/rocketleague', rocketleague);
  router.use('/stream', stream(socketio));
  return router;
};
