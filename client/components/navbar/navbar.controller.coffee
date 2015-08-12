'use strict'

angular.module 'yocApp'
.controller 'NavbarCtrl', ($scope) ->
  $scope.menu = [
    title: 'Home'
    state: 'main'
  ]
  $scope.isCollapsed = true