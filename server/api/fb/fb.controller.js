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


// Gets a list of fbs
exports.index = function(req, res) {
};

// Gets a single fb from the DB
exports.show = function(req, res) {
};

// Creates a new fb in the DB
exports.create = function(req, res) {
    var uid = req.body.user_id;
    console.log(uid);
    console.log(req);

    var client_id = "1643391279210026";
    var client_secret = "5516ce513d02afe814c7214659259a94";
    var url = "https://graph.facebook.com/v2.4/" + uid + "/notifications";

    var data = {
        "access_token": client_id + '|' + client_secret,
        "href": "fb",
        "template": "this is test notif"
    };

    request.post(url, { form: data }, function(err, httpResponse, body) {
        if (err) {
            console.error('fb request error:', err);
            return handleError(res);
        }
        body = JSON.parse(body);
        console.log('fb responded with:', body);
        if (body.error) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    });

};

// Updates an existing fb in the DB
exports.update = function(req, res) {
};

// Deletes a fb from the DB
exports.destroy = function(req, res) {
};
