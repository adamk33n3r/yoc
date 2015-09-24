'use strict';

var express = require('express');
var controller = require('./event.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/check', controller.check);
router.get('/:id', controller.show);

router.post('/', controller.create);

router.put('/:id', controller.update);
router.put('/:id/join', controller.join);
router.patch('/:id', controller.update);

router.delete('/:id', controller.destroy);

module.exports = router;
