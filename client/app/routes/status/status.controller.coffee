'use strict'

angular.module 'yocApp'
.controller 'StatusCtrl', ($scope, Status) ->
  $scope.teamspeak =
    online: false
    loaded: false
  $scope.minecraft =
    online: false
    loaded: false

  $scope.boolClass = (obj, classPrefix) ->
    return classPrefix + if obj then '-success' else '-danger'

  $scope.refresh = (serverName) ->
    server = $scope[serverName]
    server.loaded = false
    $scope[serverName + 'Refresh']()

  $scope.teamspeakRefresh = ->
    Status.teamspeak $scope

  $scope.minecraftRefresh = ->
    Status.minecraft $scope

  $scope.teamspeakRefresh()
  $scope.minecraftRefresh()
