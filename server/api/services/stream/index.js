var express = require('express');
var stream = require('./stream.controller')

var router = express.Router();

router.get('/', stream.status);
router.post('/', stream.status);

module.exports = router;
