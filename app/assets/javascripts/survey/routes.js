surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/users/sign_up', {
    templateUrl: 'devise/registrations/new.html',
    controller: 'RegistrationsNewCtrl'
  });

  $routeProvider.when('/users/sign_in', {
    templateUrl: 'devise/sessions/new.html',
    controller: 'SessionsNewCtrl'
  });

  $routeProvider.when('/homes', {
    templateUrl: 'homes/home.html',
    controller: 'HomesIndexCtrl'
  });

  return $routeProvider.otherwise({
    templateUrl: 'welcomes/welcome.html',
    controller: 'WelcomesIndexCtrl'
  });
}]);

