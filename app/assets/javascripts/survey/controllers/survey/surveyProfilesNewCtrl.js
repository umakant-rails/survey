function SurveyProfilesNewCtrl($scope, $location, surveyProfileService, growl) {

  /*$scope.createFeatures = function(){
    var features = [];
    angular.forEach(angular.element(".survey_questions"), function(element){
      var val = angular.element(element).val();
      if(val !== ""){
        features.push({title: val});
      }
    });
    if(features.length > 0){
      featureService.create({features: features}, function(response){
        if(response.success) {
          $scope.features = response.features;
          growl.addSuccessMessage(response.message);
        } else {
          growl.addErrorMessage(response.message);
        }
      });
    } else {
       growl.addErrorMessage('please fill features first');
    }
  } */
  $scope.initSurveyProfile = function(){
    $scope.surveyProfile = {}
  }

  $scope.createSurveyProfile = function(){
    var data = {
      survey_profile: $scope.surveyProfile
    }
    surveyProfileService.create({}, data, function(response){
      if(response.success) {
        growl.addSuccessMessage(response.message);
        var survey_profile = response.survey_profile;
        $location.path('/survey_profiles/' + survey_profile.id + '/features/new');
      } else {
        growl.addErrorMessage(response.message);
      }
    });
  }
  $scope.initSurveyProfile();
}
surveyApp.controller('SurveyProfilesNewCtrl', ['$scope', '$location', 'surveyProfileService', 'growl', SurveyProfilesNewCtrl]);
