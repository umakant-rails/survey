function HomesIndexCtrl($scope, $location, featureService, featureFactory) {
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
