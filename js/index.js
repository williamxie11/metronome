'use strict';

var metronomeApp = angular.module('metronomeApp', [
	'ngRoute',
	'metronomeControllers'
]);

metronomeApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'index.html',
        controller: 'MetronomeController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);