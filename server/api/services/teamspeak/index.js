var express = require('express');
var ts = require('./teamspeak.controller')

var router = express.Router();

router.get('/status', ts.status);

module.exports = router;
