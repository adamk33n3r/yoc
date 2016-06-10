var Slack = require('../../../services/slack');
var config = require('../../../config/environment');

exports.status = function (req, res) {
    console.log(req);
    Slack.sendMessage(config.slack.webhook, {
      channel: '#announcements',
      text: 'Someone started streaming on `' + req.body.name + '`! Go here to watch: https://yoc.adam-keenan.com/stream'
    });
    res.send();
};
