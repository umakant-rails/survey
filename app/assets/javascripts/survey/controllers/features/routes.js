surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/survey_profiles/:id/features/new', {
      templateUrl: 'features/new.html',
      controller: 'FeaturesNewCtrl'
  });
  $routeProvider.when('/survey_profile/:id/features/refine_features', {
      templateUrl: 'features/refine_features.html',
      controller: 'FeaturesRefineCtrl'
  });
  $routeProvider.when('/survey_profile/:id/features/feedback_completed', {
      templateUrl: 'features/feedback_completed.html',
      controller: 'FeaturesFeedbackComptetedCtrl'
  });
  $routeProvider.when('/survey_profile/:id/features/feedback_report', {
      templateUrl: 'features/feedback_report.html',
      controller: 'FeaturesFeedbackReportCtrl'
  });
}]);

