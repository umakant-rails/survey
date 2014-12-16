function SurveyImageProfilesFeedbackCtrl($scope, $location, $routeParams, surveyProfileService, featureFactory) {
  $scope.surveyImageProfileIndex =  function() {
    surveyProfileService.surveyImageProfileShow({id: $routeParams.id}, function(response){
      console.log(response.survey_profile)
      $scope.surveyProfile = response.survey_profile;
      $scope.image = response.image;
      $scope.current_user = response.current_user;
    });
  };
  $scope.surveyImageProfileIndex();
};

surveyApp.controller('SurveyImageProfilesFeedbackCtrl', ['$scope', '$location', '$routeParams', 'surveyProfileService', 'featureFactory', SurveyImageProfilesFeedbackCtrl]);
