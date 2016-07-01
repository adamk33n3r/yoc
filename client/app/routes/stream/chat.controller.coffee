'use strict'

angular.module 'yocApp'
.controller 'ChatCtrl', ($scope, $localStorage) ->
  $scope.$storage = $localStorage.$default
    messages: []

  now = Date.now()
  $scope.$storage.messages = $scope.$storage.messages.filter (message) ->
    return (now - message.timestamp) < (24 * 60 * 60 * 1000)
  guestNumber = Math.floor(Math.random() * 10000)
  user = 'Guest#' + guestNumber

  $scope.socket.on 'chat:msg', (message) ->
    links = message.text.match /https?:\/\/\S+/ig
    for link in links or []
      message.text = message.text.replace link, "<a target=\"_blank\" href=\"#{link}\">#{link}</a>"
    $scope.$storage.messages.unshift message
  $scope.socket.on 'chat:connect', (user) ->
    console.log user, 'connected'
    $scope.$storage.messages.unshift
      user: 'YOC'
      text: "#{user} connected"
      timestamp: Date.now()
  $scope.socket.on 'chat:disconnect', (user) ->
    console.log user, 'disconnected'
    if user?
      $scope.$storage.messages.unshift
        user: 'YOC'
        text: "#{user} disconnected"
        timestamp: Date.now()

  unregister = $scope.$watch 'user', =>
    console.log 'user updated'
    if $scope.user?
      user = $scope.user?.name
      $scope.socket.emit 'chat:connect', user
      unregister()

  $scope.sendChat = (evnt) ->
    return if evnt.keyCode isnt 13 or $scope.text is ''
    $scope.socket.emit 'chat:msg',
      user: user
      text: $scope.text
      timestamp: Date.now()
    $scope.text = ''
    evnt.preventDefault()

  $scope.timeout = () ->
    console.log 'timeout called'
