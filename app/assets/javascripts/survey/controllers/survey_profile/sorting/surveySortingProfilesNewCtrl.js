function SurveySortingProfilesNewCtrl($scope, $location, surveyProfileService, growl) {

  $scope.initSurveyProfile = function(){
    $scope.surveyProfile = {}
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
surveyApp.controller('SurveySortingProfilesNewCtrl', ['$scope', '$location', 'surveyProfileService', 'growl', SurveySortingProfilesNewCtrl]);
