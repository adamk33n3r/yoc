'use strict'

angular.module 'yocApp'
.factory 'Stats', ($http) ->
  rocketleague: (uid) ->
    $http.get '/api/services/rocketleague/stats/' + uid
    .then (result) ->
      return result.data
