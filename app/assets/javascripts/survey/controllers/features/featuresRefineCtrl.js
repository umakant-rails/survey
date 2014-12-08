function FeaturesRefineCtrl($scope, $location, featureFactory, featureFeedbackService, growl) {

  $scope.init = function(){
    var interestedFeature = featureFactory.getInterestedFeature();
    var nonInterestedFeature = featureFactory.getNonInterestedFeature();
    $scope.interestedFeature =  (interestedFeature === undefined) ? [] : interestedFeature;
    $scope.nonInterestedFeature = (nonInterestedFeature === undefined) ? [] : nonInterestedFeature;
    $scope.topFirstFeature = [];
    $scope.topSecondFeature = [];
    $scope.topThirdFeature = [];
  },

  $scope.saveFeedback = function(){
    if($scope.topFirstFeature.length != 0) { $scope.interestedFeature.push($scope.topFirstFeature[0]); }
    if($scope.topSecondFeature.length != 0) { $scope.interestedFeature.push($scope.topSecondFeature[0]); }
    if($scope.topThirdFeature.length != 0) { $scope.interestedFeature.push($scope.topThirdFeature[0]); }
    var data = {
      interested_feature: $scope.interestedFeature,
      non_interested_feature: $scope.nonInterestedFeature
    };
    featureFeedbackService.create(data, function(response){
      if(response.success) {
        $scope.topFirstFeature = [];
        $scope.topSecondFeature = [];
        $scope.topThirdFeature = [];
        growl.addSuccessMessage(response.message);
        $location.path('/features/feedback_completed');
      } else {
        growl.addErrorMessage(response.message);
      }
    });
  }
 $scope.init();
}
surveyApp.controller('FeaturesRefineCtrl', ['$scope', '$location', 'featureFactory', 'featureFeedbackService', 'growl', FeaturesRefineCtrl]);
