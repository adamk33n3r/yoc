/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/events              ->  index
 * POST    /api/events              ->  create
 * GET     /api/events/:id          ->  show
 * PUT     /api/events/:id          ->  update
 * DELETE  /api/events/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var User = require('../user/user.model');
var Promise = require('promise');
var FB = require('../fb/fb.controller');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates, function(a, b) {
      if (_.isArray(a)) {
        return a.concat(b);
      }
    });
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of events
exports.index = function(req, res) {
  Event.find({ date: { '$gte': Date.now() - 24*60*60*1000 } })
    .populate('attendees game')
    .execAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single event from the DB
exports.show = function(req, res) {
  Event.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new event in the DB
exports.create = function(req, res) {
  User.findOneAsync({ facebook: { id: req.body.creator } })
    .then(handleEntityNotFound(res))
    .then(function(user) {
      req.body.creator = user._id;
      Event.createAsync(req.body)
        .then(responseWithResult(res, 201))
        .catch(handleError(res));
      });
};

// Updates an existing event in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Event.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a event from the DB
exports.destroy = function(req, res) {
  Event.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.join = function(req, res) {
  var flag = JSON.parse(req.body.flag);
  var evnt = Event.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res));
  var user = User.findOneAsync({ facebook: { id: req.body.uid } })
    .then(handleEntityNotFound(res));
  Promise.all([evnt, user])
    .then(function(values) {
      var evnt = values[0];
      var user = values[1];
      if (flag) {
        return saveUpdates({ attendees: [user._id] })(evnt);
      } else {
        var idx = evnt.attendees.indexOf(user._id);
        if (idx > -1) {
          evnt.attendees.splice(idx, 1);
        }
        return saveUpdates({})(evnt);
      }
    })
    .then(function() {
      res.status(200).json({ success: true });
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
};

var second = 1000;
var minute = 60 * second;
var hour   = 60 * minute;
var day    = 24 * hour;

exports.check = function(req, res) {
  Event.find({ date: { '$gte': Date.now(), '$lte': Date.now() + day } })
    .populate('attendees game')
    .execAsync()
    .then(function(events) {
      var tasks = events.map(function(evnt) {
        var message = evnt.name + ' (' + evnt.game.name + ') is starting in ';
        if (!evnt.sent24Hr) {
          if (evnt.date - Date.now() < day) {
            console.log("Sending 24hr");
            evnt.sent24Hr = true;
            evnt.attendees.forEach(function(user) {
              FB.send_notification_raw(user.facebook.id, message + '24 hours!');
            });
          }
        } else if (!evnt.sent1Hr) {
          if (evnt.date - Date.now() < hour) {
            console.log("Sending 1hr");
            evnt.sent1Hr = true;
            evnt.attendees.forEach(function(user) {
              FB.send_notification_raw(user.facebook.id, message + 'an hour!');
            });
          }
        } else if (!evnt.sent15Min) {
          if (evnt.date - Date.now() < 15 * minute) {
            console.log("Sending 15min");
            evnt.sent15Min = true;
            evnt.attendees.forEach(function(user) {
              FB.send_notification_raw(user.facebook.id, message + '15 minutes!');
            });
          }
        }
        return evnt.saveAsync();
      });
      Promise.all(tasks).then(function(events) {
        res.json(events);
      });
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
}
