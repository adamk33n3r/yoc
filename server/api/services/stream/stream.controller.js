var Slack = require('../../../services/slack');
var config = require('../../../config/environment');

exports.status = function (req, res) {
    Slack.sendMessage(config.slack.webhook, {
      channel: '#random',
      text: (req.body.who? req.body.who : 'Someone') +  ' started streaming *' + (req.body.title ? req.body.title : 'something') + '*!\nCome join the party: https://yoc.adam-keenan.com/stream'
    });
    res.send();
};
