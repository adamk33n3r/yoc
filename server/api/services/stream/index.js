var express = require('express');
var stream = require('./stream.controller')

var router = express.Router();

module.exports = function (socketio) {
  router.get('/', stream.status(socketio));
  router.post('/', stream.status(socketio));
  return router;
};
