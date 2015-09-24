'use strict';

var mongoose = require('mongoose-bird')();
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  info: {
    type: String,
    default: "A game we play sometimes"
  },
  active: {
    type: Boolean,
    default: true
  },
  img: String
});

module.exports = mongoose.model('Game', GameSchema);
