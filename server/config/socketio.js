/**
 * Socket.io configuration
 */

'use strict';

var request = require('request');
var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socketio, socket) {
  socketio.emit('chat:disconnect', socket.user);
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function(data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/settings/settings.socket').register(socket);
  require('../api/game/game.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.address =
      socket.handshake.address !== null ?
      socket.handshake.address.address + ':' + socket.handshake.address.port :
      process.env.DOMAIN;

    socket.address = socket.handshake.headers['x-real-ip'] + ':' + socket.handshake.headers['x-real-port'];

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function() {
      onDisconnect(socketio, socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);

    socket.on('chat:connect', function (user) {
      socket.user = user;
      socketio.emit('chat:connect', user);
    });
    socket.on('chat:msg', function (msg) {
      socketio.emit('chat:msg', msg);
    });
  });

  // Update stream viewer count every 10 seconds
  setInterval(function() {
    request.get('http://eon.adam-keenan.net:8081/stats.json', function (error, response, body) {
      if (error) {
        return console.error(error);
      }
      var rtmpJson = JSON.parse(body).rtmp;
      var streams = rtmpJson.servers[0][0].live.streams;
      var foundStream = false;
      for (var i = 0; i < streams.length; i++) {
        var stream = streams[i];
        if (stream.name === 'default') {
          socketio.emit('stream:viewerCount', stream.nclients - 1);
          foundStream = true;
          break;
        }
      }
      if (!foundStream) {
        socketio.emit('stream:viewerCount', 0);
      }
    });
  }, 10000);
};
