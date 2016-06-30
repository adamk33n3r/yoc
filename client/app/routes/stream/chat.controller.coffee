'use strict'

angular.module 'yocApp'
.controller 'ChatCtrl', ($scope, $localStorage, $sce, socketFactory) ->
  console.log 'so many chats'
  # $scope.messages = ( 'test' + i for i in [1..20])
  $scope.$storage = $localStorage.$default
    messages: []
  now = Date.now()
  $scope.$storage.messages = $scope.$storage.messages.filter (message) ->
    return (now - message.timestamp) < (24 * 60 * 60 * 1000)
  guestNumber = Math.floor(Math.random() * 10000)
  user = $scope.user?.name
  user ?= 'Guest#' + guestNumber

  ioSocket = io
    # Send auth token on connection, you will need to DI the Auth service above
    # 'query': 'token=' + Auth.getToken()
    path: '/socket.io-client'

  socket = socketFactory ioSocket: ioSocket
  socket.emit 'chat:connect', user
  socket.on 'chat:msg', (message) ->
    links = message.text.match /https?:\/\/\S+/ig
    for link in links or []
      message.text = message.text.replace link, "<a target=\"_blank\" href=\"#{link}\">#{link}</a>"
    $scope.$storage.messages.unshift message
  socket.on 'chat:connect', (user) ->
    console.log user, 'connected'
  socket.on 'chat:disconnect', (user) ->
    console.log user, 'disconnected'

  $scope.sendChat = (evnt) ->
    return if evnt.keyCode isnt 13 or $scope.text is ''
    socket.emit 'chat:msg',
      user: user
      text: $scope.text
      timestamp: Date.now()
    $scope.text = ''
    evnt.preventDefault()

  $scope.timeout = () ->
    console.log 'timeout called'
