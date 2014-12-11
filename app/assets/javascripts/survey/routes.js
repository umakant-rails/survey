surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    /*$routeProvider.when('homes/home', {
      templateUrl: 'homes/home.html',
      controller: 'HomesIndexCtrl'
    });
    return $routeProvider.otherwise({
      templateUrl: 'homes/home.html',
      controller: 'HomesIndexCtrl'
    })*/
    $routeProvider.when('/welcomes', {
      templateUrl: 'welcomes/welcome.html',
      controller: 'WelcomeaIndexCtrl'
    });
    return $routeProvider.otherwise({
      templateUrl: 'welcomes/welcome.html',
      controller: 'WelcomesIndexCtrl'
    })
}]);

