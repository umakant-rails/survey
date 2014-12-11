function SurveyProfilesShowCtrl($scope, $routeParams, surveyProfileService, featureFactory) {

  $scope.surveyProfileShow = function(){
    surveyProfileService.show({id: $routeParams.id}, function(response){
      $scope.survey_profile = response.survey_profile;
      $scope.features = response.features;
      $scope.remaining_features_count = response.remaining_features_count;
      $scope.current_user = response.current_user;
    });
  },

  $scope.surveyProfileShow();
}

surveyApp.controller('SurveyProfilesShowCtrl', ['$scope', '$routeParams', 'surveyProfileService', SurveyProfilesShowCtrl]);
