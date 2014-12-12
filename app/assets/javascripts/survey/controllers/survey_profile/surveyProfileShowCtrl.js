function SurveyProfilesShowCtrl($scope, $routeParams, $location, surveyProfileService, featureFactory) {

  $scope.surveyProfileShow = function(){
    surveyProfileService.show({id: $routeParams.id}, function(response){
      $scope.surveyProfile = response.survey_profile;
      $scope.features = response.features;
      $scope.remaining_features_count = response.remaining_features_count;
      $scope.current_user = response.current_user;
    });
  },

  $scope.surveyProfileShow();
}

surveyApp.controller('SurveyProfilesShowCtrl', ['$scope', '$routeParams', '$location', 'surveyProfileService', 'featureFactory', SurveyProfilesShowCtrl]);
