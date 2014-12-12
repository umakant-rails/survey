surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/survey_profiles/new', {
    templateUrl: 'survey_profiles/new.html',
    controller: 'SurveyProfilesNewCtrl'
  });
  $routeProvider.when('/survey_profiles', {
    templateUrl: 'survey_profiles/index.html',
    controller: 'SurveyProfilesIndexCtrl'
  });
  $routeProvider.when('/survey_profiles/:id', {
    templateUrl: 'survey_profiles/show.html',
    controller: 'SurveyProfilesShowCtrl'
  });
  $routeProvider.when('/survey_profiles/:id/edit', {
    templateUrl: 'survey_profiles/edit.html',
    controller: 'SurveyProfilesEditCtrl'
  });
  $routeProvider.when('/survey_profiles/:id/feedbacks', {
    templateUrl: 'survey_profiles/feedbacks.html',
    controller: 'SurveyProfilesFeedbackCtrl'
  });
}]);

