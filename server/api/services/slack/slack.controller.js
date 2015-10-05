var Slack = require('../../../services/slack');


exports.send = function(req, res) {
  Slack.sendMessage({
    channel: req.body.channel || '#tcpi',
    text: req.body.text || 'No text provided.'
  }, function (err, response, body) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      if (response.statusCode === 500) {
        console.error(body);
        res.status(500).send(err);
      } else {
        res.json({ success: true, body: body });
      }
    }
  });
}
