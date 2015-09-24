'use strict'

describe 'Service: Event', ->

  # load the service's module
  beforeEach module 'yocApp'

  # instantiate service
  Event = undefined
  beforeEach inject (_Event_) ->
    Event = _Event_

  it 'should do something', ->
    expect(!!Event).toBe true