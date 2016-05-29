'use strict'

describe 'Controller: StatsCtrl', ->

  # load the controller's module
  beforeEach module 'yocApp'
  StatsCtrl = undefined
  scope = undefined

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    StatsCtrl = $controller 'StatsCtrl',
      $scope: scope

  it 'should ...', ->
    expect(1).toEqual 1
