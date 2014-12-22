function SurveyProfilesNewCtrl($scope, $location, surveyProfileService, growl, Auth) {
  $scope.initSurveyProfile = function(){
    if(Auth.isAuthenticated()){
      $scope.surveyProfile = {}
    } else {
      $location.path("/");
    }
  };

  $scope.createSortingSurveyProfile = function(){
    var data = {
      survey_profile: $scope.surveyProfile
    };
    surveyProfileService.create({}, data, function(response){
      if(response.success) {
        growl.addSuccessMessage(response.message);
        var survey_profile = response.survey_profile;
        $location.path('/survey_profiles/' + survey_profile.id + '/features/new');
      } else {
        growl.addErrorMessage(response.message);
      }
      $scope.selectedSurveyType = null;
    });
  };
  $scope.initSurveyProfile();
};
surveyApp.controller('SurveyProfilesNewCtrl', ['$scope', '$location', 'surveyProfileService', 'growl', 'Auth', SurveyProfilesNewCtrl]);
