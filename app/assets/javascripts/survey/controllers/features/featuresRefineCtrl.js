function FeaturesRefineCtrl($scope, featureFactory, growl) {

  $scope.init = function(){
    var interestedFeature = featureFactory.getInterestedFeature();
    var nonInterestedFeature = featureFactory.getInterestedFeature();
    $scope.interestedFeature =  (interestedFeature === undefined) ? [] : nonInterestedFeature;
    $scope.nonInterestedFeature = (nonInterestedFeature === undefined) ? [] : nonInterestedFeature;
    $scope.topFirstFeature = [];
    $scope.topSecondFeature = [];
    $scope.topThirdFeature = [];
  },

 $scope.init();
}
surveyApp.controller('FeaturesRefineCtrl', ['$scope', 'featureFactory', 'growl', FeaturesRefineCtrl]);
