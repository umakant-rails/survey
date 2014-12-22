function SurveyImageProfilesFeedbackReportCtrl($scope, $location, $routeParams, growl, surveyProfileService, featureFactory) {
  $scope.surveyImageProfileFeedbackReportIndex =  function() {
    if(Auth.isAuthenticated()){
      surveyProfileService.imageProfileFeedbackReport({id: $routeParams.id}, function(response){
        if(response.success) {
          $scope.image_survey_feedbacks = response.image_survey_feedbacks;
          $scope.surveyProfile = response.survey_profile;
          $scope.image = response.image;
          $scope.current_user = response.current_user;
        } else {
          growl.addErrorMessage("You are not authrize to access this report.");
          $location.path("/homes");
        }
      });
    } else {
      growl.addErrorMessage("You are not authrize to access this page");
      $location.path("/");
    }
  };

  $scope.surveyImageProfileFeedbackReportIndex();
};

surveyApp.controller('SurveyImageProfilesFeedbackReportCtrl', ['$scope', '$location', '$routeParams', 'growl', 'surveyProfileService', 'featureFactory', SurveyImageProfilesFeedbackReportCtrl]);
