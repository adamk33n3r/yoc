var express = require('express');
var rocketleague = require('./rocketleague.controller')

var router = express.Router();

router.get('/stats/:uid', rocketleague.stats);

module.exports = router;
