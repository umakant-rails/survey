function FeaturesNewCtrl($scope, Feature, growl) {

  $scope.init = function(){
    var numbersOfFeature = [];
    Feature.all({}, function(response){
      for(var count = 0; count < response.numbers_of_feature; count ++){
        numbersOfFeature.push(count+1);
      }
      $scope.numbersOfFeature = numbersOfFeature;
    });
  },

  $scope.createFeatures = function(){
    var features = [];
    angular.forEach(angular.element(".survey_questions"), function(element){
      var val = angular.element(element).val();
      if(val !== ""){
        features.push({title: val});
      }
    });
    if(features.length > 0){
      Feature.create({features: features}, function(response){
        if(response.success) {
          $scope.features = response.features;
          growl.addSuccessMessage(response.message);
        } else {
          growl.addErrorMessage(response.message);
        }
      });
    } else {
       growl.addErrorMessage('please fill features first');
    }
  }

 $scope.init();
}
surveyApp.controller('FeaturesNewCtrl', ['$scope', 'Feature', 'growl', FeaturesNewCtrl]);
