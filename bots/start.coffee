class Start
  constructor: (@bot) ->
    @bot.register
      open: @onStart
  onStart: ->
    console.log "i am now connected"


module.exports = Start
