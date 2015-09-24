'use strict'

angular.module 'yocApp'
.factory 'Facebook', ($http) ->
  sendNotification: (user_id, message) ->
    console.log "Sending '#{message}' to user with id #{user_id}"
    $http.post '/api/fb',
      user_id: user_id
      message: message
