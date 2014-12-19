function SurveyImageProfilesFeedbackCtrl($scope, $location, $routeParams, growl, surveyProfileService, featureFactory) {
  $scope.surveyImageProfileIndex =  function() {
    surveyProfileService.surveyImageProfileShow({id: $routeParams.id}, function(response){
      $scope.surveyProfile = response.survey_profile;
      $scope.image = response.image;
      $scope.current_user = response.current_user;
      $scope.image_survey_questions = response.feedback_questions;
      $scope.question_counter = 0;
      $scope.survey_question = $scope.image_survey_questions[$scope.question_counter]['question'];
      $scope.survey_feedbacks = [];
    });
  };

  $scope.saveImageProfileFeedback = function(survey_profile_id){
    var data = {
      survey_feedbacks : $scope.survey_feedbacks
    }
    if($scope.survey_feedbacks.length) {
      surveyProfileService.saveImageProfileFeedback({id: survey_profile_id}, data, function(response){
        if(response.success) {
          growl.addSuccessMessage(response.message);
          $location.path('/survey_profiles/1/features/feedback_completed');
        } else {
          growl.addErrorMessage(response.message);
        }
      });
    } else {
      growl.addErrorMessage('Please put feedback to sumbit');
    }
  };
  $scope.surveyImageProfileIndex();
};

surveyApp.controller('SurveyImageProfilesFeedbackCtrl', ['$scope', '$location', '$routeParams', 'growl', 'surveyProfileService', 'featureFactory', SurveyImageProfilesFeedbackCtrl]);
