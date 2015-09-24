'use strict'

angular.module 'yocApp'
.factory 'Event', ($resource) ->
  $resource '/api/events'
