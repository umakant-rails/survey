/*function HomesIndexCtrl($scope, $location, featureService, featureFactory) {
  $scope.featrueIndex = function(){
    featureService.all({}, function(response){
      $scope.features = response.features;
    });
  },

  $scope.refineFeature =  function() {
    featureFactory.setInterestedFeature($scope.interestedFeature);
    featureFactory.setNonInterestedFeature($scope.nonInterestedFeature);
    $location.path('/features/refine_features');
  }

  $scope.featrueIndex();
}

surveyApp.controller('HomesIndexCtrl', ['$scope', '$location', 'featureService', 'featureFactory', HomesIndexCtrl]);
*/
function HomesIndexCtrl($scope, $location, surveyProfileService, featureFactory) {
  $scope.featrueIndex = function(){
    surveyProfileService.all({}, function(response){
      $scope.features = response.features;
      $scope.current_user = response.current_user;
    });
  },

  /*$scope.refineFeature =  function() {
    featureFactory.setInterestedFeature($scope.interestedFeature);
    featureFactory.setNonInterestedFeature($scope.nonInterestedFeature);
    $location.path('/features/refine_features');
  } */

  $scope.featrueIndex();
}

surveyApp.controller('HomesIndexCtrl', ['$scope', '$location', 'surveyProfileService', 'featureFactory', HomesIndexCtrl]);
