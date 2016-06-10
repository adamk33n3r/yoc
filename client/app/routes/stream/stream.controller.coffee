'use strict'

angular.module 'yocApp'
.controller 'StreamCtrl', ($scope) ->
  console.log 'stream controller'
  playerInstance = jwplayer 'jwPlayer'
  playerInstance.setup
    playlist: [
      title: 'Movienight'
      description: 'We watch movies together'
      file: 'rtmp://eon.adam-keenan.net/live/movienight'
    ,
      title: 'Mike'
      description: 'Mike plays gams'
      file: 'rtmp://eon.adam-keenan.net/live/mike'
    ,
      title: 'TEST'
      description: 'Nothing to see here'
      file: 'rtmp://eon.adam-keenan.net/live/test'
    ]
    width: '100%'
    aspectratio: '16:9'
    hlshtml: true
    primary: 'html5'
    autostart: true
    skin:
      name: 'glow'
    logo:
      file: '/assets/images/yoc-100px-50a.png'
      hide: true
