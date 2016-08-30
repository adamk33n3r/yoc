mongoose = require('mongoose-bird')()
if process.env.NODE_ENV is 'production'
    config = require('./server/config/environment/production')
else
    config = require('./server/config/environment/development')
mongoose.connect(config.mongo.uri, { db: { safe: true } })

User = require './server/api/user/user.model.js'

User.findAsync {'facebook.birthday': {$exists: true}}, { 'facebook': true }
  .then (users) ->
    console.log users.map (user) ->
      name: user.facebook.name
      birthday: user.facebook.birthday
    mongoose.disconnect()

