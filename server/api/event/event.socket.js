/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Event = require('./event.model');

exports.register = function(socket) {
  Event.schema.post('save', function(doc) {
    doc.populate('attendees game', function(err, doc) {
        onSave(socket, doc);
    });
  });
  Event.schema.post('remove', function(doc) {
    doc.populate('attendees game', function(err, doc) {
        onRemove(socket, doc);
    });
  });
};

function onSave(socket, doc, cb) {
  socket.emit('event:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('event:remove', doc);
}
