function SurveyProfilesShowCtrl($scope, $routeParams, surveyProfileService, featureFactory) {

  $scope.surveyProfileShow = function(){
    surveyProfileService.show({id: $routeParams.id}, function(response){
      $scope.surveyProfile = response.survey_profile;
      if(response.survey_profile.survey_profile_type == 1){
        $scope.features = response.features;
        $scope.remaining_features_count = response.remaining_features_count;
        $scope.current_user = response.current_user;
      } else {
        $scope.image = response.image;
        $scope.current_user = response.current_user;
      }
    });
  };

  $scope.surveyProfileShow();
};

surveyApp.controller('SurveyProfilesShowCtrl', ['$scope', '$routeParams', 'surveyProfileService', 'featureFactory', SurveyProfilesShowCtrl]);
