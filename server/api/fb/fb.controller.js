/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/fb              ->  index
 * POST    /api/fb              ->  create
 * GET     /api/fb/:id          ->  show
 * PUT     /api/fb/:id          ->  update
 * DELETE  /api/fb/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var request = require('request');
var config = require('../../config/environment');

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

exports.getToken = function (req, res) {
  res.json(config.facebook);
}

exports.send_notification_raw = function(uid, message, callback) {
  var url = "https://graph.facebook.com/v2.4/" + uid + "/notifications";

  var data = {
    access_token: config.facebook.id + '|' + config.facebook.secret,
    href: '?path=/events/list',
    template: message && message.slice(0, 180) || 'This is a test notification'
  };

  request.post(url, { form: data }, callback);
}

// Sends a notification
exports.send_notification = function(req, res) {
  var uid = req.body.user_id;
  var message = req.body.message;
  exports.send_notification_raw(uid, message, function(err, httpResponse, body) {
    if (err) {
        console.error('fb request error:', err);
        return handleError(res);
    }
    body = JSON.parse(body);
    // console.log('fb responded with:', body);
    res.status(201).json(body);
  });
  if (uid === '00000000000000000') {
    if (message) {
      res.status(201).json({success: true});
    } else {
      res.status(404).json({success: false});
    }
  }
};
