'use strict'

describe 'Service: Stats', ->

  # load the service's module
  beforeEach module 'yocApp'

  # instantiate service
  Stats = undefined
  beforeEach inject (_Stats_) ->
    Stats = _Stats_

  it 'should do something', ->
    expect(!!Stats).toBe true
