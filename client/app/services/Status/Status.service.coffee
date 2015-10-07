'use strict'

angular.module 'yocApp'
.factory 'Status', ($http) ->
  teamspeak: ($scope) ->
    $http.get '/api/services/teamspeak/status'
    .success (result) ->
      $scope.teamspeak.loaded = true
      $scope.teamspeak.online = true

      # Build online users
      $scope.teamspeak.users = ({
        name: client.client_nickname,
        away: client.client_away,
        online: true
      } for client in result.data.online)

      # Add offline clients while not adding dupes
      for client in result.data.clients
        names = $scope.teamspeak.users.map (ele) ->
          return ele.name
        if client.client_nickname not in names
          $scope.teamspeak.users.push
            name: client.client_nickname
            away: false
            online: false

      $scope.teamspeak.users.sort (a, b) ->
        nameA = a.name.toLowerCase()
        nameB = b.name.toLowerCase()
        if nameA < nameB
          return -1
        if nameA > nameB
          return 1
        return 0
      # Sort by status
      $scope.teamspeak.users.sort (a, b) ->
        if (a.online and b.away) or (a.online and !b.online) or (a.away and !b.online)
          return -1
        if (b.online and a.away) or (b.online and !a.online) or (b.away and !a.online)
          return 1
        if (a.online and b.online) or (a.away and b.away) or (!a.online and !b.online)
          return 0
    .catch (error) ->
      $scope.teamspeak.loaded = true
      console.error "Couldn't connect to teamspeak server"
      console.error error
  minecraft: ($scope) ->
    $http.get '/api/services/minecraft/status'
    .success (result) ->
      $scope.minecraft.loaded = true
      $scope.minecraft.online = true
      $scope.minecraft.data = result
    .catch (error) ->
      $scope.minecraft.loaded = true
      console.error error
