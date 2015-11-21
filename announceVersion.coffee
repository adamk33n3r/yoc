slack = require './server/services/slack'
version = require './package.json'
.version

process.env.NODE_ENV = 'development'
localConfig = require './server/config/local.env'
for key, val of localConfig
  process.env[key] = val
webhook = require './server/config/environment'
.slack.webhook

slack.sendMessage webhook,
  text: "@everyone: The portal has just been updated to version #{version}!"
  attachments: [
    fallback: "#{process.argv[2]}"
    color: 'good'
    fields: [
      title: "Notes"
      value: "#{process.argv[2]}"
    ]
  ]
  channel: '#general'
