function SurveyImageProfilesNewCtrl($scope, $location, surveyProfileService, growl) {

  $scope.initSurveyProfile = function(){
    $scope.surveyProfile = {}
  };

  $scope.createImageSurveyProfile = function(){

  };
  $scope.initSurveyProfile();
};
surveyApp.controller('SurveyImageProfilesNewCtrl', ['$scope', '$location', 'surveyProfileService', 'growl', SurveyImageProfilesNewCtrl]);
