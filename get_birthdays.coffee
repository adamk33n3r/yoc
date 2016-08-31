mongoose = require('mongoose-bird')()
if process.env.NODE_ENV is 'production'
    config = require('./server/config/environment/production')
else
    config = require('./server/config/environment/development')
mongoose.connect(config.mongo.uri, { db: { safe: true } })

User = require './server/api/user/user.model.js'

#User.findAsync {'facebook.birthday': {$exists: true}}, { 'facebook': true }
#  .then (users) ->
#    console.log users.map (user) ->
#      name: user.facebook.name
#      birthday: user.facebook.birthday
today = new Date()
today.setSeconds 0
today.setMinutes 0
today.setHours 0
today.setDate 21
User.findAsync {'facebook.birthday': { $exists: true }}
  .then (users) ->
    birthdayBoys = users.filter (user) ->
      birthDate = new Date(user.facebook.birthday)
      return today.getDate() is birthDate.getDate() and today.getMonth() is birthDate.getMonth()
    console.log birthdayBoys
    console.log birthdayBoys[0].name.full
    mongoose.disconnect()

