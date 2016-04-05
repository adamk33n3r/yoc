'use strict';

var config = require('../../../config/environment');
var Slack = require('../../../services/slack');
var TeamSpeak = require('../../../services/teamspeak');
var Minecraft = require('../../../services/minecraft');

exports.send = function (req, res) {
  Slack.sendMessage(config.slack.webhook, {
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
      var connectURL = 'TeamSpeak Server\n<ts3server://ts.adam-keenan.net|Click here to connect!>\n';
      if (onlineClients.length > 0) {
        res.send({
          response_type: 'ephemeral',
          text: connectURL + 'Online users: ' +
            onlineClients.map(function (ele) {
              return ele.client_nickname;
            }).join(', ')
        });
      } else {
        res.send({
          response_type: 'ephemeral',
          text: connectURL + 'No one is online at the moment'
        });
      }
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
      var connectURL = 'YOCraft Minecraft Server\n<http://technicpack.net/modpack/ye-olde-chums.744666|Click here to play our modpack!>\n';
      var players = stat.player_;
      if (players.length > 0) {
        res.send({
            response_type: 'ephemeral',
            text: connectURL + 'Online users: ' + players.join(', ')
        });
      } else {
        res.send({
            response_type: 'ephemeral',
            text: connectURL + 'No one is online at the moment'
        });
      }
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
