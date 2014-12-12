function FeaturesNewCtrl($scope, $location, $routeParams, featureService, growl) {

  $scope.init = function(){
    var numbersOfFeature = [];
    featureService.all({survey_profile_id: $routeParams.id}, function(response){
      for(var count = 0; count < response.numbers_of_feature; count ++){
        numbersOfFeature.push(count+1);
      }
      $scope.survey_profile = response.survey_profile;
      $scope.numbersOfFeature = numbersOfFeature;
    });
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
surveyApp.controller('FeaturesNewCtrl', ['$scope', '$location', '$routeParams', 'featureService', 'growl', FeaturesNewCtrl]);
