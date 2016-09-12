'use strict';

var config = require('../../config/environment');
var Slack = require('../../services/slack');
var User = require('../../api/user/user.model.js');

module.exports = function (scheduler) {
    scheduler.scheduleJob('0 0 10 * * *', function () {
        console.log('job running');
        var today = new Date();
        User.findAsync({ 'facebook.birthday': { $exists: true } })
        .then(function (users) {
            console.log(users);
            var birthdayBoys = users.filter(function (user) {
                var birthDate = new Date(user.facebook.birthday);
                return today.getDate() === birthDate.getDate() && today.getMonth() === birthDate.getMonth();
            });
            console.log(birthdayBoys);
            birthdayBoys.forEach(function (user) {
                Slack.sendMessage(config.slack.webhook, {
                  channel: '#announcements',
                  text: 'Happy Birthday to ' + user.name.full + '! :beers:'
                }, function (err, response, body) {
                  if (err) {
                    console.error(err);
                  } else {
                    if (response.statusCode === 500) {
                      console.error(body);
                    } else {
                        // Werked
                    }
                  }
                });
            });
        });
    });
};

