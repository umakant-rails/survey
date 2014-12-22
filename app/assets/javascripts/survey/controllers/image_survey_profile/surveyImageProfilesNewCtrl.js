function SurveyImageProfilesNewCtrl($scope, $location, surveyProfileService, growl, $upload, Auth) {

  $scope.initSurveyProfile = function(){
    if(Auth.isAuthenticated()){
      $scope.surveyProfile = {}
    } else {
      $location.path("/")
    }
  };

  $scope.dropText = 'Drop files here...';

  $scope.onFileSelect = function($files) {
    $scope.file = $files[0];
  };

  $scope.createImageSurveyProfile = function(){
    var data = {
      file: $scope.file
    }

    if($scope.file != undefined){
      $scope.upload = $upload.upload({
        url: '/survey_profiles/create_image_survey.json',
        type: 'post',
        data: {myObj: $scope.myModelObj},
        file: $scope.file,
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(response, status, headers, config) {
        if(response.success){
          $location.path('/survey_profiles');
          growl.addSuccessMessage(response.message);
        }  else {
          growl.addErrorMessage(response.message);
        }
      });
    } else {
      growl.addErrorMessage("please select file first");
    }
  };
  $scope.initSurveyProfile();
};
surveyApp.controller('SurveyImageProfilesNewCtrl', ['$scope', '$location', 'surveyProfileService', 'growl', '$upload', 'Auth', SurveyImageProfilesNewCtrl]);
