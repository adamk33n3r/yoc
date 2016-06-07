'use strict'

angular.module 'yocApp'
.controller 'ChatCtrl', ($scope, socketFactory) ->
  console.log 'so many chats'
  # $scope.messages = ( 'test' + i for i in [1..20])
  $scope.messages = []
  ioSocket = io
    # Send auth token on connection, you will need to DI the Auth service above
    # 'query': 'token=' + Auth.getToken()
    path: '/socket.io-client'

  socket = socketFactory ioSocket: ioSocket
  socket.on 'chat', (text) ->
    $scope.messages.push text

  $scope.sendChat = (keyCode) ->
    return if keyCode isnt 13 or $scope.text is ''
    user = $scope.user?.name
    user ?= 'Guest'
    socket.emit 'chat', "#{user}: #{$scope.text}"
    $scope.text = ''
