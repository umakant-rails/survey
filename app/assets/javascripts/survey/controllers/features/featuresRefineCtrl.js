function FeaturesRefineCtrl($scope, featureFactory, growl) {

  $scope.init = function(){
    var interestedFeature = featureFactory.getInterestedFeature();
    var nonInterestedFeature = featureFactory.getInterestedFeature();
    console.log(nonInterestedFeature);
    $scope.interestedFeature =  (interestedFeature === undefined) ? [] : nonInterestedFeature;
    $scope.nonInterestedFeature = (nonInterestedFeature === undefined) ? [] : nonInterestedFeature;
  },

 $scope.init();
}
surveyApp.controller('FeaturesRefineCtrl', ['$scope', 'featureFactory', 'growl', FeaturesRefineCtrl]);
