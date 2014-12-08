surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/features/new', {
      templateUrl: 'features/new.html',
      controller: 'FeaturesNewCtrl'
  });
  $routeProvider.when('/features/refine_features', {
      templateUrl: 'features/refine_features.html',
      controller: 'FeaturesRefineCtrl'
  });
  $routeProvider.when('/features/feedback_completed', {
      templateUrl: 'features/feedback_completed.html',
      controller: 'FeaturesFeedbackComptetedCtrl'
  });
  $routeProvider.when('/features/feedback_report', {
      templateUrl: 'features/feedback_report.html',
      controller: 'FeaturesFeedbackReportCtrl'
  });
}]);

