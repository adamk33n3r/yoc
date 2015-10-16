var express = require('express');
var slack = require('./slack.controller')

var router = express.Router();

router.get('/status', slack.status);
router.post('/send', slack.send);

module.exports = router;
