'use strict'

angular.module 'yocApp'
.directive 'footer', ->
  templateUrl: 'components/footer/footer.html'
  restrict: 'E',
  link: (scope, element) ->
    element.addClass('footer')
