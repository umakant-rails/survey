surveyApp.directive("ddDraggable", function () {
  return {
    restrict: "A",
    link: function(scope, element, attributes, ctlr) {
      element.attr("draggable", true);
      element.bind("dragstart", function(eventObject) {
        eventObject.originalEvent.dataTransfer.setData("text", attributes.featureid);
      });
    }
  };
});

surveyApp.directive("ddDropTarget", function () {
  return {
    restrict: "A",
    controller: ['$scope', function($scope){
      this.moveToInterestedBox = function(feature_id){
        for (var index = 0; index < $scope.features.length; index++) {
          var feature = $scope.features[index];
          if (feature.id == feature_id) {
            if($scope.interestedFeature === undefined){$scope.interestedFeature = [];}
            $scope.interestedFeature.push(feature);
            $scope.features.splice(index, 1);
          }
        }
        $scope.$apply();
      },
      this.moveToNonInterestedBox = function(feature_id){
        for (var index = 0; index < $scope.features.length; index++) {
          var feature = $scope.features[index];
          if (feature.id == feature_id) {
            if($scope.nonInterestedFeature === undefined){$scope.nonInterestedFeature = [];}
            $scope.nonInterestedFeature.push(feature);
            $scope.features.splice(index, 1);
          }
        }
        $scope.$apply();
      }
    }],
    link: function (scope, element, attributes, ctrl) {
      element.bind("dragover", function(eventObject){
        eventObject.preventDefault();
      });
      element.bind("drop", function(eventObject) {
        eventObject.preventDefault();
        var dropBoxName = angular.element(this).attr('name')
        var txt = eventObject.originalEvent.dataTransfer.getData("text");
        if(dropBoxName === 'interested-circle'){
          ctrl.moveToInterestedBox(parseInt(txt), dropBoxName);
        } else{
          ctrl.moveToNonInterestedBox(parseInt(txt), dropBoxName);
        }
      });
    }
  };
});
