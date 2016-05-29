var RocketLeague = require('../../../services/rocketleague');
var config = require('../../../config/environment');

exports.stats = function (req, res) {
  RocketLeague.getStats(req.params.uid).then(function (stats) {
    res.json(stats);
  });
};
