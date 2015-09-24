'use strict';

var express = require('express');
var controller = require('./fb.controller');

var router = express.Router();

router.post('/', controller.send_notification);

module.exports = router;
