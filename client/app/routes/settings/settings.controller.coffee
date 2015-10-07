'use strict'

angular.module 'yocApp'
.controller 'SettingsCtrl', ($scope) ->
  $scope.notifications =
    facebook: true
    slack: true
    email: false
  $scope.teamspeak =
    add: ''
    names: [
      'Keener',
      'Keener - Android'
    ]
  $scope.minecraft =
    add: ''
    names: [
      'adamk33n3r'
    ]

  $scope.addUsername = (server) ->
    if server.add not in server.names
      server.names.push server.add
    server.add = ''

  $scope.removeUsername = (server, name) ->
    if (idx = server.names.indexOf name) > -1
      server.names.splice idx, 1
