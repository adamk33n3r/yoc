'use strict';

var _ = require('lodash');
var User = require('../user/user.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(user) {
    if (user) {
      res.status(statusCode).json(user.settings.usernames);
    }
  };
}

function handleEntityNotFound(res) {
  return function(user) {
    if (!user) {
      res.status(404).end();
      return null;
    }
    return user;
  };
}

function saveUpdates(updates) {
  return function(user) {
    user.settings.usernames = updates;
    return user.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

exports.get = function(req, res) {
  User.findOneAsync({ 'facebook.id': req.params.id })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.set = function(req, res) {
  User.findOneAsync({ 'facebook.id': req.params.id })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};
