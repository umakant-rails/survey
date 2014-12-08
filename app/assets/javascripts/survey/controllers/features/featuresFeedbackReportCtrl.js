function FeaturesFeedbackReportCtrl($scope, featureFeedbackService, growl) {

  $scope.initFeedbackReport = function(){
    featureFeedbackService.featureFeedbackReport({}, function(response){
      $scope.visited_user = response.visited_user;
      $scope.features_feedback = response.features_feedback;
    });
  }

  $scope.initFeedbackReport();
}

surveyApp.controller('FeaturesFeedbackReportCtrl', ['$scope', 'featureFeedbackService', 'growl', FeaturesFeedbackReportCtrl]);
