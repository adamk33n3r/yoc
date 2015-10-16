var Query = require('mcquery');

var Minecraft = function (host, port) {
  this.query = new Query(host, port, {
    timeout: 1500
  });
  this.connected = false;
};

Minecraft.prototype.connect = function () {
  return new Promise(function (fulfill, reject) {
    this.query.connect(function (err) {
      if (err) {
        reject(err);
      } else {
        this.connected = true;
        fulfill();
      }
    }.bind(this));
  }.bind(this));
}

Minecraft.prototype.status = function () {
  return new Promise(function (fulfill, reject) {
    if (!this.connected) {
      reject(new Error('You must call connect before calling status.'));
    } else {
      this.query.full_stat(function (err, stat) {
        if (err) {
          reject(err);
        } else {
          fulfill(stat);
        }
      });
    }
  }.bind(this));
}

Minecraft.prototype.close = function() {
  this.query.close();
}

module.exports = Minecraft;
