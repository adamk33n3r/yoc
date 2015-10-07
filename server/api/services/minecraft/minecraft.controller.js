var Minecraft = require('../../../services/minecraft');
var config = require('../../../config/environment');

exports.status = function (req, res) {
  var mc = new Minecraft(config.minecraft.host, config.minecraft.port);
  mc.connect().then(function () {
    mc.status().then(function (stat) {
      res.json(stat);
    });
  }).catch(function (err) {
    console.error(err);
    res.status(500).send(err);
  });
};
