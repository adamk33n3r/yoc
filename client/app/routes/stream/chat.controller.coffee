'use strict'

angular.module 'yocApp'
.controller 'ChatCtrl', ($scope, $localStorage, socketFactory) ->
  console.log 'so many chats'
  # $scope.messages = ( 'test' + i for i in [1..20])
  $scope.$storage = $localStorage.$default
    messages: []
  now = Date.now()
  $scope.$storage.messages = $scope.$storage.messages.filter (message) ->
    return (now - message.timestamp) < (24 * 60 * 60 * 1000)
  guestNumber = Math.floor(Math.random() * 10000)

  ioSocket = io
    # Send auth token on connection, you will need to DI the Auth service above
    # 'query': 'token=' + Auth.getToken()
    path: '/socket.io-client'

  socket = socketFactory ioSocket: ioSocket
  socket.on 'chat', (text) ->
    $scope.$storage.messages.unshift text

  $scope.sendChat = (evnt) ->
    return if evnt.keyCode isnt 13 or $scope.text is ''
    user = $scope.user?.name
    user ?= 'Guest#' + guestNumber
    socket.emit 'chat',
      user: user
      text: $scope.text
      timestamp: Date.now()
    $scope.text = ''
    evnt.preventDefault()

  $scope.timeout = () ->
    console.log 'timeout called'
