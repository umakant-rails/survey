surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/survey_profiles/image/new', {
    templateUrl: 'image_survey_profiles/survey_image_profile_new.html',
    controller: 'SurveyImageProfilesNewCtrl'
  });
  $routeProvider.when('/survey_profiles/image/:id', {
    templateUrl: 'image_survey_profiles/survey_image_profile_show.html',
    controller: 'SurveyImageProfilesShowCtrl'
  });
  $routeProvider.when('/survey_profiles/image/:id/feedbacks', {
    templateUrl: 'image_survey_profiles/survey_image_profile_feedbacks.html',
    controller: 'SurveyImageProfilesFeedbackCtrl'
  });
  $routeProvider.when('/survey_profiles/image/:id/feedback_report', {
    templateUrl: 'image_survey_profiles/survey_image_profile_feedback_report.html',
    controller: 'SurveyImageProfilesFeedbackReportCtrl'
  });
}]);

