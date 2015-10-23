'use strict'

angular.module 'yocApp'
.config ($stateProvider) ->
  $stateProvider.state 'stream',
    url: '/stream'
    templateUrl: 'app/routes/stream/stream.html'
    controller: 'StreamCtrl'
