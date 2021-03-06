'use strict'

angular.module 'yocApp'
.factory 'User', ($resource) ->
  $resource '/api/users/:id/:controller',
    id: '@_id'
  ,
    changePassword:
      method: 'PUT'
      params:
        controller: 'password'
    get:
      method: 'GET'
      params:
        id: 'me'
    addHighlight:
      method: 'POST'
      params:
        controller: 'highlight'

