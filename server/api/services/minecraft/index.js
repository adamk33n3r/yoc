var express = require('express');
var mc = require('./minecraft.controller')

var router = express.Router();

router.get('/status', mc.status);

module.exports = router;
