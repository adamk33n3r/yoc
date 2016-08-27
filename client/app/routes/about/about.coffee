'use strict'

angular.module 'yocApp'
.config ($stateProvider) ->
  $stateProvider.state 'about',
    url: '/about'
    templateUrl: 'app/routes/about/about.html'
    controller: 'AboutCtrl'
