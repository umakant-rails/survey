function HomesIndexCtrl($scope, surveyProfileService, featureFactory) {
  $scope.homeIndex = function(){
    surveyProfileService.all({}, function(response){
      $scope.surveyProfiles = response.survey_profiles;
      $scope.current_user = response.current_user;
    });
  };

  $scope.delete =  function(survey_profile_id) {
    var should_be_deleted = confirm('are you sure to delete survey profile?');
    if(should_be_deleted){
      surveyProfileService.delete({id: survey_profile_id}, function(response){
        if(response.success){
          var surveyProfiles = []
          angular.forEach($scope.surveyProfiles, function(surveyProfile, index){
            if(surveyProfile.id !== survey_profile_id){
              surveyProfiles.push(surveyProfile);
            }
          });
          $scope.surveyProfiles = surveyProfiles;
          growl.addSuccessMessage(response.message);
        } else {
          growl.addErrorMessage(response.message);
        }
      });
    }
  };

  $scope.homeIndex();
};

surveyApp.controller('HomesIndexCtrl', ['$scope', 'surveyProfileService', 'featureFactory', HomesIndexCtrl]);
