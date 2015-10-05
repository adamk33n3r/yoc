var TeamSpeak = require('../../../services/teamspeak');
var config = require('../../../config/environment');

exports.status = function(req, res) {
    var ts = new TeamSpeak(config.teamspeak.url, function (error) {
      res.status(500).json({ status: false, error: error });
    });
    ts.login(config.teamspeak.username, config.teamspeak.password)
    .then(function() {
      Promise.all([ts.getOnlineClients(), ts.getClients()])
      .then(function(results) {
        res.json({
          success: true,
          data: {
            online: results[0],
            clients: results[1]
          }
        });
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
