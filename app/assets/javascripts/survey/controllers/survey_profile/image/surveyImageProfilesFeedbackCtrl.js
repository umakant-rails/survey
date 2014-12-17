function SurveyImageProfilesFeedbackCtrl($scope, $location, $routeParams, growl, surveyProfileService, featureFactory) {
  $scope.surveyImageProfileIndex =  function() {
    surveyProfileService.surveyImageProfileShow({id: $routeParams.id}, function(response){
      $scope.surveyProfile = response.survey_profile;
      $scope.image = response.image;
      $scope.current_user = response.current_user;
      $scope.image_survey_questions = response.feedback_questions;
      $scope.question_counter = 0;
      $scope.survey_question = $scope.image_survey_questions[$scope.question_counter]['question'];
    });
  };

  $scope.saveImageProfileFeedback = function(){
    console.log($scope.image_survey_questions);
    var data = {
      survey_questions : $scope.image_survey_questions
    }
    surveyProfileService.saveImageProfileFeedback({}, data, function(response){
      if(response.success) {
        growl.addSuccessMessage(response.message);
        //$location.path('/survey_profiles/' + survey_profile_id + '/features/feedback_completed');
        $location.path('/survey_profiles/1/features/feedback_completed');
      } else {
        growl.addErrorMessage(response.message);
      }
    });
  }
  $scope.surveyImageProfileIndex();
};

surveyApp.controller('SurveyImageProfilesFeedbackCtrl', ['$scope', '$location', '$routeParams', 'growl', 'surveyProfileService', 'featureFactory', SurveyImageProfilesFeedbackCtrl]);
