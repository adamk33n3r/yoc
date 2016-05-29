'use strict'

angular.module 'yocApp'
.config ($stateProvider) ->
  $stateProvider.state 'games',
    url: '/games'
    templateUrl: 'app/routes/games/games.html'
    controller: 'GamesCtrl'
