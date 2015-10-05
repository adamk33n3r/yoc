'use strict'

angular.module 'yocApp'
.config ($stateProvider) ->
  $stateProvider.state 'status',
    url: '/status'
    templateUrl: 'app/routes/status/status.html'
    controller: 'StatusCtrl'
