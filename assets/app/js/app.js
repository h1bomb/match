'use strict';

/* App Module */

angular.module('match', ['matchServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/match', {templateUrl: 'partials/match.html',   controller: MatchCtrl}).
      when('/match/:url', {templateUrl: 'partials/pic.html', controller: PicCtrl}).
      when('/ret/:url', {templateUrl: 'partials/ret.html', controller: RetCtrl}).
      otherwise({redirectTo: '/match'});
}]);
