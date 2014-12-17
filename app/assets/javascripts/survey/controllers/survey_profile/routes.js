surveyApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.when('/survey_profiles/sorting/new', {
    templateUrl: 'survey_profiles/sorting_survey_new.html',
    controller: 'SurveySortingProfilesNewCtrl'
  });
  $routeProvider.when('/survey_profiles', {
    templateUrl: 'survey_profiles/index.html',
    controller: 'SurveyProfilesIndexCtrl'
  });
  $routeProvider.when('/survey_profiles/sorting/:id', {
    templateUrl: 'survey_profiles/sorting_survey_show.html',
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

  $routeProvider.when('/survey_profiles/image/new', {
    templateUrl: 'survey_profiles/survey_image_profile_new.html',
    controller: 'SurveyImageProfilesNewCtrl'
  });
  $routeProvider.when('/survey_profiles/image/:id', {
    templateUrl: 'survey_profiles/survey_image_profile_show.html',
    controller: 'SurveyImageProfilesShowCtrl'
  });
  $routeProvider.when('/survey_profiles/image/:id/feedbacks', {
    templateUrl: 'survey_profiles/survey_image_profile_feedbacks.html',
    controller: 'SurveyImageProfilesFeedbackCtrl'
  });
  $routeProvider.when('/survey_profiles/image/:id/feedback_report', {
    templateUrl: 'survey_profiles/survey_image_profile_feedback_report.html',
    controller: 'SurveyImageProfilesFeedbackReportCtrl'
  });
}]);

