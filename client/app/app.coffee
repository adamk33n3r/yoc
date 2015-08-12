'use strict'

angular.module 'yocApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'ngFacebook'
]
.config ($stateProvider, $urlRouterProvider, $locationProvider, $facebookProvider) ->
  $facebookProvider.setAppId '1643391279210026'
  $facebookProvider.setCustomInit
    xfbml: true
    version: 'v2.4'
  $urlRouterProvider
  .otherwise '/'

  $locationProvider.html5Mode true

.controller 'MainController', ($rootScope, $facebook) ->
  console.log "Booting app..."
  console.log $facebook
  $rootScope.sendNotif = (user_id) ->
    $.post '/api/fb',
      user_id: user_id
    , (result) ->
      console.log result

  onLogin = (response) ->
    if response.status is 'connected'
      $facebook.api '/me?fields=first_name'
      .then (data) ->
        $rootScope.user_id = data.id
        document.getElementById('cn').style.display = 'inline-block'
        welcomeBlock = document.getElementById('fb-welcome')
        welcomeBlock.innerHTML = "Hello, #{data.first_name} (#{data.id})!"

  $facebook.getLoginStatus().then (response) ->
    # Check login status on load, and if the user is
    # already logged in, go directly to the welcome message.
    if response.status is 'connected'
      onLogin response
    else
      # Otherwise, show Login dialog first.
      $facebook.login (response) ->
        onLogin response
      , scope: 'user_friends, email'

.run ($rootScope, $location, $window) ->
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
