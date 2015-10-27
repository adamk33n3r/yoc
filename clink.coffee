#!/usr/bin/env coffee

Bot = require './yoc-bot'

apiKey = require './clinkConfig.json'
.api

new Bot apiKey, process.cwd() + '/bots'
