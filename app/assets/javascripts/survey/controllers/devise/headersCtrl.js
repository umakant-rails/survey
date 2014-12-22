function HeadersCtrl($scope, $rootScope, $location, $window, growl, Auth) {
  $scope.user = {};
  $rootScope.userLoggedIn = Auth.isAuthenticated();

  $scope.deleteSession = function(){
    Auth.logout().then(function(oldUser) {
      //$location.path('/');
    }, function(response) {
      growl.addErrorMessage(response.data.error);
    });
  };

  $rootScope.$on('devise:login', function(event, currentUser) {
    console.log('devise:login')
    $rootScope.userLoggedIn = Auth.isAuthenticated();
    $rootScope.currentUser = currentUser;
    Auth.currentUser = currentUser;
    nextPath = $location.path();
    if(nextPath == "" || nextPath == "/"){
      $location.path('/homes');
    }
  });
  $scope.$on('devise:unauthorized', function(event, xhr, deferred) {
    console.log('gfffffffffffffff')
  });
  $scope.$on('devise:logout', function(event, oldUser) {
    $rootScope.userLoggedIn = false;
    $rootScope.currentUser = null;
    growl.addSuccessMessage(oldUser.username + " you're signed out now.");
    $location.path('');
  });

};
surveyApp.controller('HeadersCtrl', ['$scope', '$rootScope', '$location', '$window', 'growl', 'Auth', HeadersCtrl]);
