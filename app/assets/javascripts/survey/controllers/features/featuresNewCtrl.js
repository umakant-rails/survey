function FeaturesNewCtrl($scope, Feature) {

  $scope.init = function(){
    var numbersOfFeature = [];
    Feature.new({}, function(response){
      for(var count = 0; count < response.numbers_of_feature; count ++){
        numbersOfFeature.push(count+1);
      }
      $scope.numbersOfFeature = numbersOfFeature;
    });
  }
 $scope.init();
}
surveyApp.controller('FeaturesNewCtrl', ['$scope', 'Feature', FeaturesNewCtrl]);
