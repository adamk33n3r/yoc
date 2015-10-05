'use strict'

describe 'Service: Slack', ->

  # load the service's module
  beforeEach module 'yocApp'

  # instantiate service
  Slack = undefined
  beforeEach inject (_Slack_) ->
    Slack = _Slack_

  it 'should do something', ->
    expect(!!Slack).toBe true