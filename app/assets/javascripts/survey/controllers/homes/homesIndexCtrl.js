function HomesIndexCtrl($scope, Feature) {
  $scope.featrueIndex = function(){
    Feature.all({}, function(response){
      $scope.features = response.features;
    });
  }
  $scope.featrueIndex();
}

surveyApp.controller('HomesIndexCtrl', ['$scope', 'Feature', HomesIndexCtrl]);
