var surveyApp = angular.module('surveyApp', ['ngRoute', 'templates', 'ngResource', 'angular-growl', 'angularFileUpload']);

surveyApp.config([
  '$httpProvider', function($httpProvider) {
    return $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
  }
]);

surveyApp.config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive(5000);
}]);

surveyApp.run(function($rootScope, $location, $window){
  $rootScope.$on('$locationChangeSuccess', function(){
    $rootScope.actualLocation = $location.path();
  });
  $rootScope.$watch(
    function() {
      return $location.path();
    },
    function(newLocation, oldLocation){
      if($rootScope.actualLocation == newLocation){
        $window.location.reload();
        $location.path(newLocation);
      }
    }
  );
});
