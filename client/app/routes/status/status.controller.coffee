'use strict'

angular.module 'yocApp'
.controller 'StatusCtrl', ($scope, $http) ->
  $scope.ts =
    online: false
    users: {}
  $http.get '/api/services/teamspeak/status'
  .success (result) ->
    $scope.ts.online = true
    for client in result.data.clients
      onlineUser = (result.data.online.filter (ele) ->
        return ele.client_database_id is client.cldbid
      )[0]
      if $scope.ts.users[client.client_nickname]?.online
        console.log "continuing"
        continue
      # continue if not (onlineUser and client.client_nickname of $scope.ts.users)
      $scope.ts.users[client.client_nickname] =
        away: onlineUser?.client_away
        online: onlineUser?
  .catch (error) ->
    console.error "Couldn't connect to teamspeak server"
    console.error error

