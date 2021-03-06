'use strict'

angular.module 'yocApp'
.controller 'NavbarCtrl', ($rootScope, $scope, Auth) ->
  $scope.menu = [
    title: 'Home'
    state: 'main'
  ,
    title: 'Status'
    state: 'status'
  ,
    title: 'Stream'
    state: 'stream'
  ,
    title: 'Games'
    state: 'games'
  ,
    title: 'About'
    state: 'about'
  ]

  $scope.isCollapsed = true
  $scope.isAdmin = Auth.isAdmin

  $scope.isLoggedIn = ->
    $rootScope.user?

  $scope.getCurrentUser = ->
    $rootScope.user

  $scope.collapse = ->
    $scope.isCollapsed = true
