slack = require './server/services/slack'
version = require './package.json'
.version

process.env.NODE_ENV = 'development'
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
