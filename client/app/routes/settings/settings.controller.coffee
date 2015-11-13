'use strict'

angular.module 'yocApp'
.controller 'SettingsCtrl', ($scope, socket, Settings) ->
  $scope.loaded = false
  $scope.notifications =
    facebook: true
    slack: true
    email: true
  $scope.usernames =
    teamspeak:
      add: ''
      names: []
    minecraft:
      add: ''
      names: []

  $scope.$on 'loggedin', (_, id) ->
    notifPromise = Settings.notifications.get
      id: id
    .$promise.then (notifications) ->
      $scope.notifications = notifications
    userPromise = Settings.usernames.get
      id: id
    .$promise.then (usernames) ->
      $scope.usernames.teamspeak.names = usernames.teamspeak
      $scope.usernames.minecraft.names = usernames.minecraft

    Promise.all [notifPromise, userPromise]
    .then ->
      $scope.$apply ->
        $scope.loaded = true

  $scope.changeNotifications = ->
    Settings.notifications.save { id: $scope.user_id }, $scope.notifications

  $scope.addUsername = (server) ->
    if server.add not in server.names
      server.names.push server.add
    server.add = ''
    Settings.usernames.save { id: $scope.user_id},
      teamspeak: $scope.usernames.teamspeak.names
      minecraft: $scope.usernames.minecraft.names

  $scope.removeUsername = (server, name) ->
    if (idx = server.names.indexOf name) > -1
      server.names.splice idx, 1
    Settings.usernames.save { id: $scope.user_id},
      teamspeak: $scope.usernames.teamspeak.names
      minecraft: $scope.usernames.minecraft.names

  $scope.boolSuccessDanger = (obj, classPrefix) ->
    return classPrefix + if obj then '-success' else '-danger'

  $scope.boolCheckTimes = (obj) ->
    return 'fa-' + if obj then 'check' else 'times'
