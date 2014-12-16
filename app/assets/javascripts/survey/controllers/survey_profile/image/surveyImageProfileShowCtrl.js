function SurveyImageProfilesShowCtrl($scope, $routeParams, surveyProfileService, featureFactory) {

  $scope.surveyProfileShow = function(){
    surveyProfileService.surveyImageProfileShow({id: $routeParams.id}, function(response){
      $scope.surveyProfile = response.survey_profile;
      $scope.image = response.image;
      $scope.current_user = response.current_user;
    });
  };

  $scope.surveyProfileShow();
};

surveyApp.controller('SurveyImageProfilesShowCtrl', ['$scope', '$routeParams', 'surveyProfileService', 'featureFactory', SurveyImageProfilesShowCtrl]);
