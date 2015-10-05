'use strict'

angular.module 'yocApp'
.controller 'AdminCtrl', ($rootScope, $scope, $http, Auth, User, Facebook, Slack) ->
  # $scope.uid = $rootScope.user_id

  $http.get '/api/users'
  .success (users) ->
    $scope.users = (user for user in users when user.facebook?)
  $http.get '/api/games'
  .success (games) ->
    $scope.games = games

  $scope.slack =
    channel: '#tcpi'
    message: 'Testing 1 2 3'

  $scope.setUID = (user) ->
    $scope.user_id = user.facebook.id

  $scope.sendNotif = (user_id, message) ->
    Facebook.sendNotification user_id, message
    .then (result) ->
      console.log result

  $scope.sendSlack = (channel, message) ->
    Slack.sendMessage channel, message
    .then (result) ->
      console.log result

  # $scope.delete = (user) ->
  #   User.remove id: user._id
  #   $scope.users.splice @$index, 1
