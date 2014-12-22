function SessionsNewCtrl($scope, $rootScope, $location, $window, Auth, growl) {
  $scope.user = {};

  $scope.createSession = function(){
    var credentials = $scope.user;
    if(credentials.email != undefined && credentials.password != undefined) {
      Auth.login(credentials).then(function(user) {
        growl.addSuccessMessage('Successfully logged in');
      }, function(response) {
        growl.addErrorMessage(response.data.error);
      });
    } else {
      if(credentials.email == undefined && credentials.password == undefined){
        growl.addErrorMessage('please fill email and password field first.')
      } else if(credentials.email != undefined && credentials.password == undefined){
        growl.addErrorMessage('please password field first.')
      } else {
        growl.addErrorMessage('please fill email field first.')
      }
    }
  };

  /*$scope.$on('devise:login', function(event, currentUser) {
    console.log('devise:login')
    $rootScope.userLoggedIn = Auth.isAuthenticated();
    $rootScope.currentUser = currentUser;
    Auth.currentUser = currentUser;
    $location.path('/homes');
  });*/

  $scope.$on('devise:new-session', function(event, currentUser) {
    $rootScope.userLoggedIn = Auth.isAuthenticated();
    $rootScope.currentUser = currentUser;
    Auth.currentUser = currentUser;
    $location.path('/homes');
  });
};
surveyApp.controller('SessionsNewCtrl', ['$scope', '$rootScope', '$location', '$window', 'Auth', 'growl', SessionsNewCtrl]);
