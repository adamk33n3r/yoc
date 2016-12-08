var express = require('express');
var slack = require('./slack.controller')

var router = express.Router();

router.get('/status', slack.status);
router.post('/send', slack.send);
router.post('/roll', slack.roll);
router.post('/lenny', slack.lenny);
router.post('/invite', slack.invite);

module.exports = router;
