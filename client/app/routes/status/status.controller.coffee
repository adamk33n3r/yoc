'use strict'

angular.module 'yocApp'
.controller 'StatusCtrl', ($scope, Status, Settings) ->
  $scope.teamspeak =
    online: false
    loaded: false
  $scope.steam =
    online: false
    loaded: false
  $scope.minecraft =
    online: false
    loaded: false

  Settings.allUsernames.query()
  .$promise.then (usernames) ->
    console.log usernames
    $scope.usernames = usernames
    $scope.teamspeakRefresh()
    $scope.minecraftRefresh()

  Status.steam()

  $scope.boolClass = (obj, classPrefix) ->
    return classPrefix + if obj then '-success' else '-danger'

  $scope.refresh = (serverName) ->
    server = $scope[serverName]
    server.loaded = false
    $scope[serverName + 'Refresh']()

  $scope.teamspeakRefresh = ->
    Status.teamspeak $scope.usernames
    .then (data) ->
      $scope.teamspeak.loaded = true
      $scope.teamspeak.online = true
      $scope.teamspeak.channels = data.channels
      $scope.teamspeak.offlineUsers = data.offlineUsers

  $scope.minecraftRefresh = ->
    Status.minecraft $scope

