function SurveyImageProfilesFeedbackReportCtrl($scope, $location, $routeParams, growl, surveyProfileService, featureFactory) {
  $scope.surveyImageProfileFeedbackReportIndex =  function() {
    console.log($routeParams.id)
    surveyProfileService.imageProfileFeedbackReport({id: $routeParams.id}, function(response){
      $scope.image_survey_feedbacks = response.image_survey_feedbacks;
      $scope.surveyProfile = response.survey_profile;
      $scope.image = response.image;
      $scope.current_user = response.current_user;
    });
  };

  $scope.surveyImageProfileFeedbackReportIndex();
};

surveyApp.controller('SurveyImageProfilesFeedbackReportCtrl', ['$scope', '$location', '$routeParams', 'growl', 'surveyProfileService', 'featureFactory', SurveyImageProfilesFeedbackReportCtrl]);
