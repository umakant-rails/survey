function FeaturesFeedbackReportCtrl($scope, $location, $routeParams, featureFeedbackService, Auth, growl) {

  $scope.initFeedbackReport = function(){
    if(Auth.isAuthenticated()){
      featureFeedbackService.featureFeedbackReport({survey_profile_id: $routeParams.id}, function(response){
        $scope.survey_profile = response.survey_profile;
        if($scope.survey_profile.user_id == Auth.currentUser.id || Auth.currentUser.role_id == 1){
          $scope.visited_user = response.visited_user;
          $scope.features_feedback = response.features_feedback;
        } else {
          growl.addErrorMessage("You are not authrize to access this report.");
          $location.path("/homes");
        }
      });
    } else {
      growl.addErrorMessage("You are not authrize to access this report.");
      $location.path("/");
    }
  };

  $scope.initFeedbackReport();
};

surveyApp.controller('FeaturesFeedbackReportCtrl', ['$scope', '$location', '$routeParams', 'featureFeedbackService', 'Auth', 'growl', FeaturesFeedbackReportCtrl]);
