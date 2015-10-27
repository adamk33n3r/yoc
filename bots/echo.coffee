class Echo
  constructor: (@bot) ->
    @bot.register
      message: @onMessage
  onMessage: (msg) =>
    channel = @bot.client.slack.getChannelGroupOrDMByID msg.channel
    sender = @bot.client.slack.getUserByID msg.user
    unless channel.is_channel?
      @bot.send "Echo: " + msg.text, channel


module.exports = Echo
