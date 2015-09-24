'use strict'

angular.module 'yocApp'
.controller 'EventCtrl', ($rootScope, $scope, $http, $state, moment, socket, Event) ->
  switch $state.current.name
    when 'event'
      $state.go 'event.list'
      return
    when 'event.list'
      $scope.listActive = true
    when 'event.create'
      $scope.createActive = true
  moment.locale 'en',
    calendar:
      lastDay : '[Yesterday at] LT'
      sameDay : '[Today at] LT'
      nextDay : '[Tomorrow at] LT'
      lastWeek : '[last] dddd [at] LT'
      nextWeek : 'dddd [at] LT'
      sameElse: 'L [at] LT'
  $scope.events = []
  $scope.newEvent = {
    date: moment().add(1, 'days').format();
  }

  $scope.$on '$destroy', ->
    socket.unsyncUpdates 'event'

  $http.get('/api/events').success (events) ->
    $scope.events = events
    socket.syncUpdates 'event', $scope.events
  , ->
    console.log "error"

  $http.get '/api/games'
  .success (games) ->
    $scope.games = games

  $scope.createEvent = (valid, name, game, date) ->
    if valid
      Event.save
        name: name
        game: game
        date: date
        creator: $rootScope.user.id
      .$promise.then (newEvent) ->
        console.log "Event created", newEvent
        $scope.listActive = true
        $scope.createActive = false
        $state.go 'event.list'
    else
      console.log "Form invalid"

  $scope.joinEvent = (eventToJoin, joinFlag) ->
    $http.put '/api/events/' + eventToJoin._id + '/join',
      uid: $rootScope.user.id
      flag: joinFlag
    , (result) ->
      console.log result

  $scope.attending = (evnt, user) ->
    if evnt? and user?
      s = (attendee for attendee in evnt.attendees when attendee.facebook.id is user.id)
      return s.length > 0
    else return false

  $scope.closeDateTimePicker = (selector) ->
    console.log selector
    $(selector).close()
  $scope.toggled = (open) ->
    console.log "toggled", open
