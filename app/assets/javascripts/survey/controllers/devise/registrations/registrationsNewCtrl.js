function RegistrationsNewCtrl($scope, $rootScope, $location, $window, Auth, growl) {
  $scope.user = {};

  $scope.createNewAccount = function(){
    var credentials = $scope.user;
    console.log(credentials)
    Auth.register(credentials).then(function(registeredUser) {
      growl.addSuccessMessage('Successfully created user account.');
    }, function(error) {
       growl.addErrorMessage(response.data.error);
    });
  };


  $scope.$on('devise:new-registration', function(event, currentUser) {
    $rootScope.userLoggedIn = (currentUser != undefined)
    $rootScope.currentUser = currentUser;
    Auth.currentUser = currentUser;
    $location.path('/homes');
  });

};
surveyApp.controller('RegistrationsNewCtrl', ['$scope', '$rootScope', '$location', '$window', 'Auth', 'growl', RegistrationsNewCtrl]);
