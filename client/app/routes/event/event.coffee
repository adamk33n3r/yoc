'use strict'

angular.module 'yocApp'
.config ($stateProvider) ->
  $stateProvider.state 'event',
    url: '/events'
    templateUrl: 'app/routes/event/event.html'
    controller: 'EventCtrl'
  .state 'event.list',
    url: '/list'
    templateUrl: 'app/routes/event/event-list.html'
    controller: 'EventCtrl'
  .state 'event.create',
    url: '/create'
    templateUrl: 'app/routes/event/event-create.html'
    controller: 'EventCtrl'
