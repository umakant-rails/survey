function SurveyImageProfilesNewCtrl($scope, $location, surveyProfileService, growl, $upload) {

  $scope.initSurveyProfile = function(){
    $scope.surveyProfile = {}
  };

  $scope.dropText = 'Drop files here...';

  $scope.onFileSelect = function($files) {
    $scope.file = $files[0];
  };

  $scope.createImageSurveyProfile = function(){
    var data = {
      file: $scope.file
    }
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
  };
  $scope.initSurveyProfile();
};
surveyApp.controller('SurveyImageProfilesNewCtrl', ['$scope', '$location', 'surveyProfileService', 'growl', '$upload', SurveyImageProfilesNewCtrl]);
