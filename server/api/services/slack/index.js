var express = require('express');
var slack = require('./slack.controller')

var router = express.Router();

router.post('/send', slack.send);

module.exports = router;
