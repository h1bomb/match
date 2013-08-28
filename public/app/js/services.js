'use strict';

/* Services */

angular.module('matchServices', ['ngResource']).
    factory('Match', function($resource){
  return $resource('data/pics.json', {}, {
    query: {method:'GET', isArray:true}
  });
});
