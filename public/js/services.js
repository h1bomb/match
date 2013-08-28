'use strict';

/* Services */

angular.module('matchServices', ['ngResource']).
    factory('Match', function($resource){
  return $resource('/favor/:id', {}, {
    query: {method:'GET', isArray:true},
    vote:{method:'PUT'},
    save:{method:'PUT'}
  });
});
