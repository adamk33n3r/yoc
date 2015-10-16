var config = require('../../../config/environment');
var Slack = require('../../../services/slack');
var TeamSpeak = require('../../../services/teamspeak');
var Minecraft = require('../../../services/minecraft');

exports.send = function (req, res) {
  Slack.sendMessage(config.slack.url, {
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
};

var ts_status = function (req, res) {
  var ts = new TeamSpeak(config.teamspeak.url, function (error) {
    res.status(500).send(error);
  });
  ts.login(config.teamspeak.username, config.teamspeak.password)
  .then(function() {
    ts.getOnlineClients()
    .then(function(onlineClients) {
      res.send(onlineClients.map(function (ele) {
        return ele.client_nickname;
      }).join(', '));
      ts.close();
    })
    .catch(function(err) {
      res.status(500).send(err);
    });
  })
  .catch(function(err) {
    res.status(500).send(err);
  });
};

var mc_status = function (req, res) {
  var mc = new Minecraft(config.minecraft.host, config.minecraft.port);
  mc.connect().then(function () {
    mc.status().then(function (stat) {
      res.json(stat);
    });
  }).catch(function (err) {
    res.send('Minecraft server is offline');
  });
}

exports.status = function (req, res) {
  var service = req.query.text.split(' ')[0];
  if (!service) {
    res.send('Available services: ts, mc');
  } else if (service === 'ts') {
    ts_status(req, res);
  } else if (service === 'mc') {
    mc_status(req, res);
  } else {
    res.status(500).send('Invalid service name');
  }
};
