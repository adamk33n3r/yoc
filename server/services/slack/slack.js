var request = require('request');

var Slack = {}

Slack.sendMessage = function(url, payload, callback) {
  if (typeof payload === 'string') {
    payload = {
      text: payload
    };
  }
  payload.link_names = true
  request.post({
    url: url,
    form: {
      payload: JSON.stringify(payload).replace(/\\\\/g, '\\')
    }
  }, callback);
};

module.exports = Slack;
