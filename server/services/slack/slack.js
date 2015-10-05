var config = require('../../config/environment');
var request = require('request');

var Slack = {}

Slack.sendMessage = function(payload, callback) {
  if (typeof payload === 'string') {
    payload = {
      text: payload
    };
  }
  payload.link_names = true
  request.post({
    url: config.slack.url,
    form: {
      payload: JSON.stringify(payload).replace(/\\\\/g, '\\')
    }
  }, callback);
};

module.exports = Slack;
