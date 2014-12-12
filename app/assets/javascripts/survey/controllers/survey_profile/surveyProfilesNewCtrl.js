function SurveyProfilesNewCtrl($scope, $location, surveyProfileService, growl) {

  $scope.initSurveyProfile = function(){
    $scope.surveyProfile = {}
  };

  $scope.createSurveyProfile = function(){
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
    });
  };
  $scope.initSurveyProfile();
};
surveyApp.controller('SurveyProfilesNewCtrl', ['$scope', '$location', 'surveyProfileService', 'growl', SurveyProfilesNewCtrl]);
