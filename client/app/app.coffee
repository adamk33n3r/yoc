'use strict'

angular.module 'yocApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ngFacebook',
  'ui.select',
  'ui.validate',
  'ui.bootstrap.datetimepicker',
  'angularMoment',
  'ngStorage',
  'config'
]
.config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $facebookProvider) ->
  $.get '/api/fb/get-token'
  .then (facebook) ->
    $facebookProvider.setAppId facebook.id
    .setCustomInit
      xfbml: true
      version: 'v2.4'
    $urlRouterProvider
    .otherwise '/'

  $locationProvider.html5Mode true
  $httpProvider.interceptors.push 'authInterceptor'

.controller 'MainController', ($rootScope, $facebook, version, User) ->
  console.log "Booting app..."
  $rootScope.version = version
  $rootScope.facebookLoaded = false
  # $rootScope.user_id = "0000000000"
  $rootScope.message = "This is a test notification from @[10207313578220466]"

  onLogin = (response, firstTime = false) ->
    if response.status is 'connected'
      $facebook.api '/me?fields=name,email'
      .then (data) ->
        $rootScope.user_id = data.id
        console.log "User id is #{data.id}"
        $rootScope.facebookLoaded = true
        $rootScope.$broadcast 'loggedin', data.id
        if firstTime
          console.log "Creating new user"
          newUser = new User
            name:
              full: data.name
            email: data.email
            facebook: data
          newUser.$save()
            .catch (err) ->
              console.log err
              #alert "Failed to create user. Contact admin."
    else
      alert "You must login with Facebook in order to use this app."

  $facebook.getLoginStatus().then (response) ->
    # Check login status on load, and if the user is
    # already logged in, go directly to the welcome message.
    if response.status is 'connected'
      onLogin response
    else
      # Otherwise, show Login dialog first.
      # $facebook.login()
      # .then (response) ->
      #   onLogin response, true

  $rootScope.fbLogin = ->
    $facebook.login()
    .then (response) ->
      onLogin response, true

  $rootScope.$on 'fb.auth.authResponseChange', (event, response, FB) ->
    $rootScope.status = $facebook.isConnected()
    if $rootScope.status
      $facebook.cachedApi '/me'
      .then (user) ->
        $rootScope.user = user

.factory 'authInterceptor', ($rootScope, $q, $cookieStore, $injector) ->
  state = null
  # Add authorization token to headers
  request: (config) ->
    config.headers = config.headers or {}
    config.headers.Authorization = 'Bearer ' + $cookieStore.get 'token' if $cookieStore.get 'token'
    config

  # Intercept 401s and redirect you to login
  responseError: (response) ->
    if response.status is 401
      (state || state = $injector.get '$state').go 'login'
      # remove any stale tokens
      $cookieStore.remove 'token'

    $q.reject response

.filter 'trusted', ($sce) ->
  return (url) ->
    return $sce.trustAsResourceUrl url

.filter 'time', () ->
  return (timestamp) ->
    date = new Date(timestamp)
    hours = date.getHours()
    minutes = '0' + date.getMinutes()
    return "#{hours}:#{minutes.substr(-2)}"

.run ($rootScope, $state, $location, Auth) ->
  # Redirect to login if route requires auth and you're not logged in
  $rootScope.$on '$stateChangeStart', (event, next) ->
    searchObj = $location.search()
    if 'path' of searchObj
      $location.path searchObj.path
      $location.search 'path', null
    Auth.isLoggedIn (loggedIn) ->
      $state.go 'login' if next.authenticate and not loggedIn

  # Load the facebook SDK asynchronously
  # If we've already installed the SDK, we're done
  return if document.getElementById('facebook-jssdk')

  # Get the first script element, which we'll use to find the parent node
  body = document.getElementsByTagName('body')[0]

  # Create a new script element and set its id
  facebookJS = document.createElement('script')
  facebookJS.id = 'facebook-jssdk'

  # Set the new script's source to the source of the Facebook JS SDK
  facebookJS.src = '//connect.facebook.net/en_US/sdk.js'

  # Insert the Facebook JS SDK into the DOM
  body.insertBefore(facebookJS, body.firstChild)
