'use strict'

describe 'Service: Game', ->

  # load the service's module
  beforeEach module 'yocApp'

  # instantiate service
  Game = undefined
  beforeEach inject (_Game_) ->
    Game = _Game_

  it 'should do something', ->
    expect(!!Game).toBe true