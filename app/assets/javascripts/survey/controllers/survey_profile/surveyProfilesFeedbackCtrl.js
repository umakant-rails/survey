function SurveyProfilesFeedbackCtrl($scope, $location, $routeParams, featureService, featureFactory) {
  $scope.featrueIndex = function(){
    featureService.all({survey_profile_id: $routeParams.id}, function(response){
      $scope.features = response.features;
      $scope.current_user = response.current_user;
      $scope.survey_profile = response.survey_profile;
    });
  },

  $scope.refineFeature =  function(survey_profile_id) {
    featureFactory.setInterestedFeature($scope.interestedFeature);
    featureFactory.setNonInterestedFeature($scope.nonInterestedFeature);
    featureFactory.setSurveyProfile($scope.survey_profile);
    $location.path('/survey_profiles/' + survey_profile_id + '/features/refine_features');
  }

  $scope.truncate = function(str){
    if(str.length > 16){
      return str.substring(0, 13) + '...';
    } else {
      return str;
    }
  }
  $scope.featrueIndex();
}

surveyApp.controller('SurveyProfilesFeedbackCtrl', ['$scope', '$location', '$routeParams', 'featureService', 'featureFactory', SurveyProfilesFeedbackCtrl]);
