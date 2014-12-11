function SurveyProfilesEditCtrl($scope, $routeParams, $location, surveyProfileService, featureFactory, growl) {

  $scope.displaySurveyProfile = function(){
    surveyProfileService.edit({id: $routeParams.id}, function(response){
      $scope.surveyProfile = response.survey_profile;
      $scope.current_user = response.current_user;
    });
  }

  $scope.updateSurveyProfile = function(survey_profile_id){
    var data = {
      survey_profile: $scope.surveyProfile
    }
    surveyProfileService.update({id: survey_profile_id}, data, function(response){
      if(response.success){
        $scope.surveyProfile = response.survey_profile;
        $scope.current_user = response.current_user;
        $location.path('/survey_profiles/' + response.survey_profile.id);
        growl.addSuccessMessage(response.message);
      }  else {
        growl.addErrorMessage(response.message);
      }
    });
  }

  $scope.displaySurveyProfile();
}

surveyApp.controller('SurveyProfilesEditCtrl', ['$scope', '$routeParams', '$location', 'surveyProfileService', 'featureFactory', 'growl', SurveyProfilesEditCtrl]);
