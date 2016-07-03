'use strict'

angular.module 'yocApp'
.controller 'StreamCtrl', ($scope) ->
  $scope.viewers = 0
  $scope.socket.on 'stream:viewerCount', (viewerCount) ->
    console.log 'updated viewerCount', viewerCount
    $scope.viewers = viewerCount

  jwplayer 'jwPlayer'
  .setup
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
    autostart: window.location.hostname is 'yoc.adam-keenan.com'
    skin:
      name: 'glow'
    logo:
      file: '/assets/images/yoc-100px-50a.png'
      hide: true
