'use strict'

describe 'Service: Status', ->

  # load the service's module
  beforeEach module 'yocApp'

  # instantiate service
  Status = undefined
  beforeEach inject (_Status_) ->
    Status = _Status_

  it 'should do something', ->
    expect(!!Status).toBe true