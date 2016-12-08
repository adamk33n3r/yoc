'use strict'

angular.module 'yocApp'
.factory 'Slack', ($http) ->
  sendMessage: (channel, message) ->
    console.log "Sending '#{message}' to slack channel #{channel}"
    $http.post '/api/services/slack/send',
      channel: channel
      text: message
  sendInvite: (email) ->
    console.log "Sending invite to #{email}"
    $http.post '/api/services/slack/invite',
      email: email
