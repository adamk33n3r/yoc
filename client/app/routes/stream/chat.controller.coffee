'use strict'

angular.module 'yocApp'
.controller 'ChatCtrl', ($scope, $localStorage, $window) ->
  intervalID = 0
  unreadMessages = 0
  currentPlaylist = null

  # Ask for notification permissions
  if Notification.permission isnt 'denied' or Notification.permission isnt 'granted'
    Notification.requestPermission()

  # Figure out which variable and event to use
  if $window.document.hidden?
    hiddenAttr = 'hidden'
    visChangeEvent = 'visibilitychange'
  else if $window.document.msHidden?
    hiddenAttr = 'msHidden'
    visChangeEvent = 'msvisibilitychange'
  else if $window.document.webkitHidden?
    hiddenAttr = 'webkitHidden'
    visChangeEvent = 'webkitvisibilitychange'

  # If the tab is hidden
  isTabbedAway = () -> $window.document[hiddenAttr]

  # Save the current title
  title = $window.document.title
  updateTitle = () ->
    # If there are unread messages, show them in the title. Else reset it
    if unreadMessages > 0
      $window.document.title = "(#{unreadMessages}) #{title}"
    else
      $window.document.title = title

  # Clear unread messages and remove from title if tab is switched to
  $window.document.addEventListener visChangeEvent, () ->
    unless isTabbedAway()
      unreadMessages = 0
      clearInterval intervalID
      intervalID = 0
      updateTitle()

  $scope.$storage = $localStorage.$default
    playlist: {}

  # Setup guest name
  guestNumber = Math.floor(Math.random() * 10000)
  user = 'Guest#' + guestNumber

  # Switch to other chat channel when switching playlist
  $scope.$on 'playlist', (e, playlistName) ->
    $scope.$apply () ->
      currentPlaylist = playlistName
      unless $scope.$storage[currentPlaylist]?
        $scope.$storage[currentPlaylist] = []

      # Get rid of messages that are over a day old
      now = Date.now()
      $scope.$storage[currentPlaylist] = $scope.$storage[currentPlaylist].filter (message) ->
        return (now - message.timestamp) < (24 * 60 * 60 * 1000)

  $scope.socket.on 'chat:msg', (message) ->
    console.log message
    return if message.playlist isnt currentPlaylist
    links = message.text.match /https?:\/\/\S+/ig
    for link in links or []
      message.text = message.text.replace link, "<a target=\"_blank\" href=\"#{link}\">#{link}</a>"
    $scope.getMessages().unshift message

    # If tab is hidden
    if isTabbedAway()
      # Update title
      unreadMessages++

      first = true
      clearInterval intervalID if intervalID isnt 0
      intervalID = setInterval () ->
        if first
          updateTitle()
        else
          $window.document.title = "#{message.user} sent a message!"
        first = not first
      , 1000

      # Create notification
      notification = new Notification "New message from #{message.user}",
        body: message.text
        icon: '/assets/images/yoc.png'
        tag: 'chat:message'
      notification.onclick = (ev) ->
        notification.close()
        window.focus()
      setTimeout notification.close.bind(notification), 3000

  $scope.socket.on 'chat:connect', (user) ->
    console.log user, 'connected'
    $scope.getMessages().unshift
      user: 'YOC'
      text: "#{user} connected"
      timestamp: Date.now()

  $scope.socket.on 'chat:disconnect', (user) ->
    console.log user, 'disconnected'
    if user?
      $scope.getMessages().unshift
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
      playlist: currentPlaylist
      timestamp: Date.now()
    $scope.text = ''
    evnt.preventDefault()

  $scope.getMessages = () ->
    return $scope.$storage[currentPlaylist]
