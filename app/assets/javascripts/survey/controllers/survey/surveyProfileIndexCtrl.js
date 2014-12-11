function SurveyProfilesIndexCtrl($scope, $location, surveyProfileService, featureFactory) {
  $scope.featrueIndex = function(){
    surveyProfileService.all({}, function(response){
      $scope.survey_profiles = response.survey_profiles;
      $scope.current_user = response.current_user;
    });
  },

  $scope.refineFeature =  function() {
    featureFactory.setInterestedFeature($scope.interestedFeature);
    featureFactory.setNonInterestedFeature($scope.nonInterestedFeature);
    $location.path('/features/refine_features');
  }

  $scope.featrueIndex();
}

surveyApp.controller('SurveyProfilesIndexCtrl', ['$scope', '$location', 'surveyProfileService', 'featureFactory', SurveyProfilesIndexCtrl]);
