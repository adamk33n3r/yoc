var path = require('path');
var request = require('request');
var querystring = require('querystring');

var friendIDs = [
  '76561198031336929',
  '76561198024475759',
  '76561197997841436',
  '76561198053634150',
  '76561198045302310',
  '76561198044798672',
  '76561198027035569',
  '76561198002513981'
];

var Steam = function (key) {
  this.key = key;
  this.connected = false;
  this.url = 'api.steampowered.com';
  this.steamid = '76561197994505647';
  this.apis = {
    ISteamUser: 'ISteamUser'
  };
  // "/GetFriendList/v0001/?key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&steamid=76561197960435530&relationship=friend"
};

Steam.prototype.getFriendList = function () {
  var url = path.join(this.url, this.apis.ISteamUser, 'GetFriendList', 'v0001');
  return this.sendRequest(url, {
    key: this.key,
    steamid: this.steamid,
    relationship: 'friend'
  }).then(function (data) {
    data.friendslist.friends = data.friendslist.friends.filter(function (friend) {
      return friendIDs.indexOf(friend.steamid) >= 0;
    });
    return data;
  });
};

Steam.prototype.getPlayerSummaries = function (ids) {
  // The user's current status. 0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play.
  var url = path.join(this.url, this.apis.ISteamUser, 'GetPlayerSummaries', 'v0002');
  return this.sendRequest(url, {
    key: this.key,
    steamids: ids.join(',')
  }).then(function (data) {
    return data.response.players
  });
};

Steam.prototype.sendRequest = function (url, params) {
  var queryParams = querystring.stringify(params);
  var uri = 'http://' + url + '/?' + queryParams;
  return new Promise(function (fulfill, reject) {
    request.get(uri, function (error, response, body) {
      if (error) {
        return reject(error);
      }
      if (response.statusCode === 200) {
        var data = JSON.parse(body);
        fulfill(data);
      } else {
        reject(body);
      }
    });
  });
};

module.exports = Steam;
