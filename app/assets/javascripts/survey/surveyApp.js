var surveyApp = angular.module('surveyApp', ['ngRoute', 'templates', 'ngResource', 'angular-growl', 'angularFileUpload', 'Devise']);

surveyApp.config(['growlProvider', function(growlProvider) {
  growlProvider.globalTimeToLive(5000);
}]);

surveyApp.run(["$location", "$route", "$rootScope", '$window', "growl", "Auth",
  function($location, $route, $rootScope, $window, growl, Auth){
  Auth.currentUser().then(function(user) {
  }, function(error) {
    growl.addErrorMessage(error.data.error);
    return $location.path("/");
  });
  $rootScope.$on('$locationChangeStart', function(ev, next, current) {
    var nextPath, nextRoute;
    nextPath = $location.path();
    nextRoute = $route.routes[nextPath];
    if (nextRoute && (nextPath === "/users/sign_up" || nextPath === "/users/sign_in") && Auth.isAuthenticated()) {
      $location.path("/homes");
    } else if (nextRoute && nextRoute.auth && !Auth.isAuthenticated()) {
      return $location.path("/");
    }
  });
  return $rootScope.$on('$locationChangeSuccess', function(){
    var is_false = true;
    setInterval(function(){
      var cotainer_children = angular.element("#container").children().length;
      if(is_false && cotainer_children == 0){
        is_false = false;
        $window.location.reload();
      }
    }, 500);
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
