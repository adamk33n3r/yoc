'use strict'

angular.module 'yocApp'
.config ($stateProvider) ->
  $stateProvider.state 'settings',
    url: '/settings'
    templateUrl: 'app/routes/settings/settings.html'
    controller: 'SettingsCtrl'
