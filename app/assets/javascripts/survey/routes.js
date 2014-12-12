surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/homes', {
    templateUrl: 'welcomes/welcome.html',
    controller: 'WelcomesIndexCtrl'
  });
  return $routeProvider.otherwise({
    templateUrl: 'welcomes/welcome.html',
    controller: 'WelcomesIndexCtrl'
  });
}]);

