function FeaturesFeedbackReportCtrl($scope, $routeParams, featureFeedbackService, growl) {

  $scope.initFeedbackReport = function(){
    featureFeedbackService.featureFeedbackReport({survey_profile_id: $routeParams.id}, function(response){
      $scope.visited_user = response.visited_user;
      $scope.features_feedback = response.features_feedback;
    });
  }

  $scope.initFeedbackReport();
}

surveyApp.controller('FeaturesFeedbackReportCtrl', ['$scope', '$routeParams', 'featureFeedbackService', 'growl', FeaturesFeedbackReportCtrl]);
