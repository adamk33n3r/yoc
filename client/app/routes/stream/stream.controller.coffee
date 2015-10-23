'use strict'

angular.module 'yocApp'
.controller 'StreamCtrl', ($scope) ->
  console.log "Asdf"
  flowplayer 'stream', '/assets/flowplayer/flash/flowplayer-3.2.18.swf',
    clip:
      url: 'movienight'
      live: true
      provider: 'rtmp'
    plugins:
      rtmp:
        url: '/assets/flowplayer/flash/flowplayer.rtmp-3.2.13.swf'
        netConnectionUrl: 'rtmp://eon.adam-keenan.net/live'
