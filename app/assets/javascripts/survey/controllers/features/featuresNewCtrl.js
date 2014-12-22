function FeaturesNewCtrl($scope, $location, $routeParams, featureService, Auth, growl) {

  $scope.init = function(){
    var numbersOfFeature = [];
    if(Auth.isAuthenticated()){
      featureService.all({survey_profile_id: $routeParams.id}, function(response){
        $scope.surveyProfile = response.survey_profile;
        console.log(Auth.currentUser)
        if($scope.surveyProfile.user_id == Auth.currentUser.id || Auth.currentUser.role_id == 1){
          for(var count = 0; count < response.numbers_of_feature; count ++){
            numbersOfFeature.push(count+1);
          }
          $scope.numbersOfFeature = numbersOfFeature;
        } else {
          growl.addErrorMessage("You are not able to create feature to this survey profile.");
          $location.path("/homes");
        }
      });
    } else {
      growl.addErrorMessage("please login to be continue.");
      $location.path("/");
    }
  };

  $scope.createFeatures = function(survey_profile_id){
    var features = [];
    angular.forEach(angular.element(".survey_questions"), function(element){
      var val = angular.element(element).val();
      if(val !== ""){
        features.push({title: val, survey_profile_id: survey_profile_id});
      }
    });
    if(features.length > 0){
      featureService.create({survey_profile_id: survey_profile_id}, {features: features}, function(response){
        if(response.success) {
          $scope.features = response.features;
          growl.addSuccessMessage(response.message);
          $location.path('/survey_profiles')
        } else {
          growl.addErrorMessage(response.message);
        }
      });
    } else {
       growl.addErrorMessage('please fill features first');
    }
  };

 $scope.init();
};
surveyApp.controller('FeaturesNewCtrl', ['$scope', '$location', '$routeParams', 'featureService', 'Auth', 'growl', FeaturesNewCtrl]);
