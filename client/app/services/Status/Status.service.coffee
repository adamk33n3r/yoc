'use strict'

angular.module 'yocApp'
.factory 'Status', ($http) ->
  teamspeak: (usernames) ->
    $http.get '/api/services/teamspeak/status'
    .then (result) ->
      channels = []
      offlineUsers = []

      # Build online users
      users = ({
        name: client.client_nickname,
        away: client.client_away,
        online: true,
        cid: client.cid
      } for client in result.data.data.online)

      # Sort alphabetically
      users.sort (a, b) ->
        nameA = a.name.toLowerCase()
        nameB = b.name.toLowerCase()
        if nameA < nameB
          return -1
        if nameA > nameB
          return 1
        return 0

      # Sort by status
      users.sort (a, b) ->
        if (a.online and b.away) or (a.online and !b.online) or (a.away and !b.online)
          return -1
        if (b.online and a.away) or (b.online and !a.online) or (b.away and !a.online)
          return 1
        if (a.online and b.online) or (a.away and b.away) or (!a.online and !b.online)
          return 0

      # Attach to correct channel
      for channel in result.data.data.channels
        channel.users = []
        for client in users when client.cid is channel.cid
          for username in usernames
            idx = username.usernames.teamspeak.indexOf client.name
            if idx >= 0
              client.realname = username.name
              break
          channel.users.push client
      channels = result.data.data.channels

      # Get offline clients whithout dupes
      onlineNames = users.map (ele) ->
        return ele.name
      offlineNames = []
      for client in result.data.data.clients
        if client.client_nickname not in onlineNames and client.client_nickname not in offlineNames
          offlineNames.push client.client_nickname
          offlineUsers.push
            name: client.client_nickname
            away: false
            online: false

      return {
        channels
        offlineUsers
      }

    .catch (error) ->
      console.error "Couldn't connect to teamspeak server"
      console.error error

  steam: ->
    $http.get '/api/services/steam/status'

  minecraft: ($scope) ->
    $http.get '/api/services/minecraft/status'
    .success (result) ->
      $scope.minecraft.loaded = true
      $scope.minecraft.online = true
      $scope.minecraft.data = result
    .catch (error) ->
      $scope.minecraft.loaded = true
      $scope.minecraft.online = false
      # console.error error
