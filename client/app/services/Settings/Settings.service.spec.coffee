'use strict'

describe 'Service: Settings', ->

  # load the service's module
  beforeEach module 'yocApp'

  # instantiate service
  Settings = undefined
  beforeEach inject (_Settings_) ->
    Settings = _Settings_

  it 'should do something', ->
    expect(!!Settings).toBe true