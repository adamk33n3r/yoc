'use strict'

angular.module 'yocApp'
.controller 'MainCtrl', ($scope, Slack) ->
  $scope.sendInvite = () ->
    Slack.sendInvite $scope.email
    .then (response) ->
      $scope.sentInvite = true
      $scope.email = ''
