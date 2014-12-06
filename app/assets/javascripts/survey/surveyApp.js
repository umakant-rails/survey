var surveyApp = angular.module('surveyApp', ['ngRoute', 'templates', 'ngResource']);

surveyApp.config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

surveyApp.run(function() {
  return console.log('angular app running');
});
