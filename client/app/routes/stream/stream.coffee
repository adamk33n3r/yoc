'use strict'

angular.module 'yocApp'
.config ($stateProvider) ->
  $stateProvider.state 'stream',
    url: '/stream'
    views:
      '':
        controller: ($scope, socketFactory) ->
          ioSocket = io
            # Send auth token on connection, you will need to DI the Auth service above
            # 'query': 'token=' + Auth.getToken()
            path: '/socket.io-client'
            forceNew: true

          $scope.socket = socketFactory ioSocket: ioSocket
          $scope.$on '$stateChangeStart', (e) ->
            console.log 'disconnecting socket'
            $scope.socket.disconnect()

        templateUrl: 'app/routes/stream/stream.html'
      'stream@stream':
        templateUrl: 'app/routes/stream/stream-stream.html'
        controller: 'StreamCtrl'
      'chat@stream':
        templateUrl: 'app/routes/stream/stream-chat.html'
        controller: 'ChatCtrl'
