'use strict';

var express = require('express');
var controller = require('./fb.controller');

var router = express.Router();

router.get('/get-token', controller.getToken);
router.post('/', controller.send_notification);

module.exports = router;
