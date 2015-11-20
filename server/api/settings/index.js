'use strict';

var express = require('express');
var notifications = require('./notifications.controller');
var usernames = require('./usernames.controller');

var router = express.Router();

router.get('/:id/notifications', notifications.get);
router.post('/:id/notifications', notifications.set);

router.get('/usernames', usernames.getAll);
router.get('/:id/usernames', usernames.get);
router.post('/:id/usernames', usernames.set);

module.exports = router;
