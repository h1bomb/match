'use strict';

/* App Module */

angular.module('match', ['matchServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/match', {templateUrl: 'partials/match.html',   controller: MatchCtrl}).
      when('/match/:id', {templateUrl: 'partials/pic.html', controller: PicCtrl}).
      when('/ret/:id', {templateUrl: 'partials/ret.html', controller: RetCtrl}).
      otherwise({redirectTo: '/match'});
}]);
