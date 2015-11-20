'use strict'

angular.module 'yocApp'
.factory 'Settings', ($resource) ->
  notifications: $resource '/api/settings/:id/notifications'
  usernames: $resource '/api/settings/:id/usernames'
  allUsernames: $resource '/api/settings/usernames'
