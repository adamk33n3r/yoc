'use strict';

var express = require('express');

var email = require('./email');
var slack = require('./slack');
var teamspeak = require('./teamspeak');
var minecraft = require('./minecraft');
var rocketleague = require('./rocketleague');

var router = express.Router();

router.use('/email', email);
router.use('/slack', slack);
router.use('/teamspeak', teamspeak);
router.use('/minecraft', minecraft);
router.use('/rocketleague', rocketleague);

module.exports = router;
