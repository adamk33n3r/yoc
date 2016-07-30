var express = require('express');
var steam = require('./steam.controller')

var router = express.Router();

router.get('/status', steam.status);

module.exports = router;
