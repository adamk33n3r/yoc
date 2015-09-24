'use strict';

var mongoose = require('mongoose-bird')();
var Schema = mongoose.Schema;
var FK = mongoose.Schema.Types.ObjectId;

var EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  recurring: {
    type: Boolean,
    default: false
  },
  game: {
    type: FK,
    ref: 'Game'
  },
  creator: {
    type: FK,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  sent24Hr: {
    type: Boolean,
    default: false
  },
  sent1Hr: {
    type: Boolean,
    default: false
  },
  sent15Min: {
    type: Boolean,
    default: false
  },
  attendees: [{
    type: FK,
    ref: 'User',
  }]
});

EventSchema.path('attendees').validate(function (value) {
  var seen = {};
  var uniqued = value.filter(function (item) {
    return seen.hasOwnProperty(item.toString()) ? false : (seen[item] = true);
  });
  return value.length === uniqued.length;
}, 'Already joined event');

module.exports = mongoose.model('Event', EventSchema);
