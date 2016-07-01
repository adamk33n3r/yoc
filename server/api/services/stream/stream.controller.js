var Slack = require('../../../services/slack');
var config = require('../../../config/environment');

exports.status = function (socketio) {
  return function (req, res) {
    if (req.body.call === 'publish') {
      Slack.sendMessage(config.slack.webhook, {
        channel: '#random',
        text: (req.body.who? req.body.who : 'Someone') +  ' started streaming *' + (req.body.title ? req.body.title : 'something') + '*!\nCome join the party: https://yoc.adam-keenan.com/stream'
      });
    } else if (req.body.call === 'play') {
      socketio.emit('stream:viewer++');
    } else if (req.body.call === 'play_done') {
      socketio.emit('stream:viewer--');
    }
    res.send();
  };
};
