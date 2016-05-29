'use strict';

var request = require('request');
var cheerio = require('cheerio');

var config = require('../../config/environment');
var Steam = require('../steam');

var RocketLeague = {};

RocketLeague.lookup = function (name) {
  return new Promise(function (fulfill, reject) {
    request.post({
      url: 'https://rocketleaguestats.com/profile/lookup',
      form: {
        platform: 1,
        uniqueId: name,
        submit_lookup: ''
      },
      followRedirects: false
    }, function (error, response, body) {
      if (error) {
        return reject(error);
      }
      return fulfill(response.headers.location.match(/\/profile\/steam\/(\d+)/)[1]);
    });
  });
};

/**
 * uid: either numeric id or unique url path
 */
RocketLeague.getStats = function (uid) {
  var stats = {
    name: '',
    ranks: {},
    stats: {}
  };
  var statNames = ['Wins', 'Saves', 'MVPs', 'MVP%', 'Goals', 'Shots', 'Assists', 'Shot Accuracy'];
  return new Promise(function (fulfill, reject) {
    request.get('https://rocketleaguestats.com/profile/steam/' + uid, function (error, response) {
      if (error) {
        return reject(error);
      }
      var $ = cheerio.load(response.body);
      var rows = $('.profile_player-stats-table tr');
      var items = rows.eq(1).add(rows.eq(3)).text().replace(/\n +/g, ',').split(',');
      items.splice(0, 1);
      items.splice(4, 1);
      items.splice(-1, 1);
      items.forEach(function (stat, i) {
        stats.stats[statNames[i]] = stat;
      });
      var steam = new Steam(config.steam.token);
      steam.getPlayerSummaries([uid]).then(function (info) {
        stats.name = info[0].personaname;
      }).then(function () {
        return fulfill(stats);
      });
    });
  });
}

module.exports = RocketLeague;
