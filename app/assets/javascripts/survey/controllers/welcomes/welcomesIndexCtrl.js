function WelcomesIndexCtrl($scope, surveyProfileService, featureFactory) {
  $scope.welcomeIndex = function(){
    surveyProfileService.all({}, function(response){
      $scope.survey_profiles = response.survey_profiles;
      $scope.current_user = response.current_user;
    });
  },
  $scope.welcomeIndex();
}

surveyApp.controller('WelcomesIndexCtrl', ['$scope', 'surveyProfileService', WelcomesIndexCtrl]);
