'use strict'

describe 'Controller: StreamCtrl', ->

  # load the controller's module
  beforeEach module 'yocApp'
  StreamCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    StreamCtrl = $controller 'StreamCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
