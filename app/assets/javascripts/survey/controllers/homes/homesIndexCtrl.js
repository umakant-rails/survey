function HomesIndexCtrl($scope, surveyProfileService, featureFactory) {
  $scope.homeIndex = function(){
    surveyProfileService.all({}, function(response){
      $scope.features = response.features;
      $scope.current_user = response.current_user;
    });
  };
  $scope.homeIndex();
};

surveyApp.controller('HomesIndexCtrl', ['$scope', 'surveyProfileService', 'featureFactory', HomesIndexCtrl]);
