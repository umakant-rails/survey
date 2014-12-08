surveyApp.directive("ddDraggable", function () {
  return {
    restrict: "A",
    link: function(scope, element, attributes, ctlr) {
      element.attr("draggable", true);
      element.bind("dragstart", function(eventObject) {
        eventObject.originalEvent.dataTransfer.setData("textFeatureId", attributes.featureid);
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
        var textFeatureId = eventObject.originalEvent.dataTransfer.getData("textFeatureId");
        if(dropBoxName === 'interested-circle'){
          ctrl.moveToInterestedBox(parseInt(textFeatureId), dropBoxName);
        } else{
          ctrl.moveToNonInterestedBox(parseInt(textFeatureId), dropBoxName);
        }
      });
    }
  };
});

surveyApp.directive("top3Draggable", function () {
  return {
    restrict: "A",
    link: function(scope, element, attributes, ctlr) {
      element.attr("draggable", true);
      element.bind("dragstart", function(eventObject) {
        eventObject.originalEvent.dataTransfer.setData("textFeatureId", attributes.featureid);
      });
    }
  };
});

surveyApp.directive("top3DropTarget", function () {
  return {
    restrict: "A",
    controller: ['$scope', function($scope){
      this.findSelectedFeature = function(feature_id, interestedPosition){
        for (var index = 0; index < $scope.interestedFeature.length; index++) {
          var feature = $scope.interestedFeature[index];
          if (feature.id == feature_id) {
            if(interestedPosition === "interested-box-first"){
              feature.interestedPosition = 1;
              $scope.topFirstFeature.push(feature);
              $scope.interestedFeature.splice(index,1);
              $scope.$apply();
            } else if(interestedPosition === "interested-box-second"){
              feature.interestedPosition = 2;
              $scope.topSecondFeature.push(feature);
              $scope.interestedFeature.splice(index,1);
              $scope.$apply();
            }else if(interestedPosition === "interested-box-third"){
              feature.interestedPosition = 3;
              $scope.topThirdFeature.push(feature);
              $scope.interestedFeature.splice(index,1);
              $scope.$apply();
            }
            break;
          }
        }
      }
    }],
    link: function (scope, element, attributes, ctrl) {
      element.bind("dragover", function(eventObject){
        eventObject.preventDefault();
      });
      element.bind("drop", function(eventObject) {
        eventObject.preventDefault();
        var dropBoxName = angular.element(this).attr('name')
        var textFeatureId = eventObject.originalEvent.dataTransfer.getData("textFeatureId");
        ctrl.findSelectedFeature(parseInt(textFeatureId), dropBoxName);
      });
    }
  };
});

surveyApp.directive("resetInterstedNonInterestedElement", function () {
  return{
    controller: ['$scope', function($scope){
      this.resetElementFromInteresedList = function(featureId){
        for (var index = 0; index < $scope.interestedFeature.length; index++) {
          var feature = $scope.interestedFeature[index];
          if (feature.id == featureId) {
            if($scope.features === undefined){$scope.features = []}
            $scope.features.push(feature);
            $scope.interestedFeature.splice(index, 1);
          }
        }
        $scope.$apply();
      },
      this.resetElementFromNonInteresedList = function(featureId){
        for (var index = 0; index < $scope.nonInterestedFeature.length; index++) {
          var feature = $scope.nonInterestedFeature[index];
          if (feature.id == featureId) {
            if($scope.features === undefined){$scope.features = []}
            $scope.features.push(feature);
            $scope.nonInterestedFeature.splice(index, 1);
          }
        }
        $scope.$apply();
      }
    }],
    link: function(scope, element, attributes, ctrl){
      element.on('click', function(){
        var featureId = attributes['featureId'];
        var name = attributes['name'];
        if(name == "interested-circle-element") {
          ctrl.resetElementFromInteresedList(featureId);
          element.parent().remove();
        } else {
          ctrl.resetElementFromNonInteresedList(featureId);
          element.parent().remove();
        }
      });
    }
  }
});

surveyApp.directive("resetTop3Feature", function () {
  return{
    controller: ['$scope', function($scope){
      this.resetTop3Feature = function(name){
        if(name == "first-top-feature"){
          var feature = $scope.topFirstFeature[0];
          feature.interestedPosition = null;
          $scope.interestedFeature.push(feature);
          $scope.topFirstFeature.splice(0,1);
          $scope.$apply();
        } else if(name == "second-top-feature") {
          var feature = angular.copy($scope.topSecondFeature[0]);
          feature.interestedPosition = null;
          $scope.interestedFeature.push(feature);
          $scope.topSecondFeature = [];
          $scope.$apply();
        } else {
          var feature = angular.copy($scope.topThirdFeature[0]);
          feature.interestedPosition = null;
          $scope.interestedFeature.push(feature);
          $scope.topThirdFeature = [];
          $scope.$apply();
        }
      }
    }],
    link: function(scope, element, attributes, ctrl){
      element.on('click', function(){
        var name = attributes['name'];
        ctrl.resetTop3Feature(name);
      });
    }
  }
});
