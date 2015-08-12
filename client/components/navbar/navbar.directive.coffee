'use strict'

angular.module 'yocApp'
.directive 'navbar', ->
  templateUrl: 'components/navbar/navbar.html'
  restrict: 'E'
  controller: 'NavbarCtrl'
