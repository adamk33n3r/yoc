'use strict'

angular.module 'yocApp'
.controller 'NavbarCtrl', ($rootScope, $scope, Auth) ->
  $scope.menu = [
    title: 'Home'
    state: 'main'
  ,
    title: 'Events'
    state: 'event'
  ]
  $scope.isCollapsed = true
  $scope.isLoggedIn = ->
    $rootScope.user?
  $scope.isAdmin = Auth.isAdmin
  $scope.getCurrentUser = ->
    $rootScope.user
