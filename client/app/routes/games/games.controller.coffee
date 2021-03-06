'use strict'

angular.module 'yocApp'
.controller 'GamesCtrl', ($scope, $state, Stats, User) ->
  $scope.rocketleague =
    loaded: false
    users: {}
  uids = [
    '76561198024475759',
    '76561197994505647'
  ]
  $scope.overwatch =
    highlight:
      title: ''
      name: ''
      user: null
    loaded: false
    highlights: [
      name: 'adamk33n3r'
      links: [
        'SadTastyHarborporpoise'
        'GlaringReasonableBongo'
      ]
    ,
      name: 'Slater182x'
      links: [
        'MelodicAromaticArizonaalligatorlizard'
      ]
    ]

  $scope.addingHighlight = false
  $scope.addHighlight = (highlight) ->
    $scope.addingHighlight = true
    User.addHighlight id: highlight.user.id,
      highlight:
        title: highlight.title
        name: highlight.name
    .$promise.then (response) ->
      $state.reload()

  $scope.validateName = (value) ->
    partA = value.startsWith 'https://'
    partB = value.match /[^a-zA-Z]/
    return not (partA or partB)

  $scope.log = (thing) ->
    console.log thing

  promises = uids.map (uid) ->
    Stats.rocketleague(uid)
    .then (stats) ->
      $scope.rocketleague.users[uid] = stats
  Promise.all promises
  .then () ->
    $scope.rocketleague.loaded = true

  loadOverwatch = ->
    $scope.overwatch.loaded = false
    User.query highlights: true
    .$promise.then (users) ->
      $scope.users = users
      $scope.usersWithHighlights = users.filter (user) ->
        return user.highlights.length
      $scope.overwatch.loaded = true
  loadOverwatch()

  $scope.refresh = (game) ->
    if game is 'overwatch'
      loadOverwatch()

  angular.element(document.body).on 'click', 'video', (evnt) ->
    ele = evnt.target
    if ele.paused then ele.play() else ele.pause()
