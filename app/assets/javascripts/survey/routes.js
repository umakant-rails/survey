surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
      templateUrl: 'homes/home.html',
      controller: 'HomesIndexCtrl'
    });
    return $routeProvider.otherwise({
      templateUrl: 'homes/home.html',
      controller: 'HomesIndexCtrl'
    })
}]);

