var Slack = require('../../../services/slack');
var config = require('../../../config/environment');

exports.status = function (socketio) {
  return function (req, res) {
    if (req.body.name === 'default') {
      if (req.body.call === 'publish') {
        var silent = req.body.silent;
        var channel = req.body.channel;
        if (typeof silent === "undefined" || silent === null) {
          Slack.sendMessage(config.slack.webhook, {
            channel: channel || '#random',
            text: (req.body.who ? req.body.who : 'Someone') +  ' started streaming *' + (req.body.title ? req.body.title : 'something') + '*!\nCome join the party: https://yoc.adam-keenan.com/stream'
          });
        }
      }
    }
    res.send();
  };
};
