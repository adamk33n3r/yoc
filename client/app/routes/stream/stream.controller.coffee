'use strict'

angular.module 'yocApp'
.controller 'StreamCtrl', ($scope) ->
  console.log 'stream controller'
  playerInstance = jwplayer 'jwPlayer'
  playerInstance.setup
    file: 'rtmp://eon.adam-keenan.net/live/movienight'
    width: '100%'
    aspectratio: '16:9'
    hlshtml: true
    primary: 'html5'
    skin:
      name: 'glow'
    logo:
      file: '/assets/images/yoc-100px-50a.png'
      hide: true
