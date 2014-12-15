function SurveyImageProfilesNewCtrl($scope, $location, surveyProfileService, growl, $upload) {

  $scope.initSurveyProfile = function(){
    $scope.surveyProfile = {}
  };

  $scope.dropText = 'Drop files here...';

  $scope.onFileSelect = function($files) {
    var reader = new FileReader();
    console.log($files[0]);
    /*$scope.upload = $upload.upload({
      url: 'server/upload/url', //upload.php script, node.js route, or servlet url
      data: {myObj: $scope.myModelObj},
      file: file, // or list of files ($files) for html5 only
    }).progress(function(evt) {
      console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
    }).success(function(data, status, headers, config) {
      console.log(data);
    });*/
  };

  $scope.initSurveyProfile();
};
surveyApp.controller('SurveyImageProfilesNewCtrl', ['$scope', '$location', 'surveyProfileService', 'growl', '$upload', SurveyImageProfilesNewCtrl]);
