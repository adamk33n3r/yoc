'use strict'

angular.module 'yocApp'
.config ($stateProvider) ->
  $stateProvider.state 'stream',
    url: '/stream'
    views:
      '':
        templateUrl: 'app/routes/stream/stream.html'
      'stream@stream':
        templateUrl: 'app/routes/stream/stream-stream.html'
        controller: 'StreamCtrl'
      'chat@stream':
        templateUrl: 'app/routes/stream/stream-chat.html'
        controller: 'ChatCtrl'
