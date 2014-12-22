var surveyApp = angular.module('surveyApp', ['ngRoute', 'templates', 'ngResource', 'angular-growl', 'angularFileUpload', 'Devise']);

surveyApp.config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive(5000);
}]);

surveyApp.run(["$location", "$route", "$rootScope", "Auth", function($location, $route, $rootScope, Auth){
  Auth.currentUser().then(function(user) {
  }, function(error) {
    return $location.path("/");
  });

  return $rootScope.$on('$locationChangeStart', function(ev, next, current) {
    var nextPath, nextRoute;
    nextPath = $location.path();
    nextRoute = $route.routes[nextPath];

    if (nextRoute && (nextPath === "/users/sign_up" || nextPath === "/users/sign_in") && Auth.isAuthenticated()) {
      $location.path("/homes");
    } else if (nextRoute && nextRoute.auth && !Auth.isAuthenticated()) {
      return $location.path("/");
    }
  });
}]);


/*surveyApp.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
  $rootScope.$on('$locationChangeSuccess', function(){
    $rootScope.actualLocation = $location.path();
  });
  $rootScope.$watch(
    function() {
      return $location.path()
    },
    function(newLocation, oldLocation){
      if($rootScope.actualLocation == newLocation){
        console.log(newLocation);
        console.log($window.navigator.appName);
        $window.location.reload();
        $location.path(newLocation);
      }
    }
  );
});
*/
