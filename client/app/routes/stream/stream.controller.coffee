'use strict'

angular.module 'yocApp'
.controller 'StreamCtrl', ($scope) ->
  $scope.viewers = 0
  $scope.socket.on 'stream:viewerCount', (viewerCount) ->
    console.log 'updated viewerCount', viewerCount
    $scope.viewers = viewerCount


  settings =
    playlist: [
      title: 'Default'
      description: 'Stream stuff, mane'
      file: 'rtmp://eon.adam-keenan.net/live/default'
    ,
      title: 'Movienight'
      description: 'We watch movies together'
      file: 'rtmp://eon.adam-keenan.net/live/movienight'
    ,
      image: '/assets/images/trove.jpg'
      title: 'TEST'
      description: 'Nothing to see here'
      file: 'rtmp://eon.adam-keenan.net/live/test'
    ,
      title: 'Mike'
      description: 'Mike plays gams'
      file: 'rtmp://eon.adam-keenan.net/live/mike'
    ]
    width: '100%'
    aspectratio: '16:9'
    hlshtml: true
    primary: 'html5'
    autostart: window.location.hostname is 'yoc.adam-keenan.com'
    skin:
      name: 'glow'
    logo:
      file: '/assets/images/yoc-100px-50a.png'
      hide: true

  jwplayer 'jwPlayer'
  .setup settings
  .onError (e) ->
    console.log 'onError', e
