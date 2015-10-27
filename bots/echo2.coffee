class Reverse
  constructor: (@bot) ->
    @bot.register
      message: @onMessage
  onMessage: (msg) =>
    return unless msg.text?
    channel = @bot.client.slack.getChannelGroupOrDMByID msg.channel
    unless channel.is_channel?
      reversedMsg = msg.text.split('').reverse().join('')
      @bot.send "Reverse: " + reversedMsg, channel


module.exports = Reverse
