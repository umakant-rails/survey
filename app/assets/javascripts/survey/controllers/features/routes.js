surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/question/new', {
      templateUrl: 'features/new.html',
      controller: 'FeaturesNewCtrl'
  });
}]);

