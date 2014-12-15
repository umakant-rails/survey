surveyApp.directive("sortDataTable", function () {
  return {
    restrict: "A",
    link: function(scope, element, attributes, ctrl) {
      scope.columnName = 'title';
      scope.reverse = true;
      element.on('click', function(){
        var columnName = element.attr('data-column');
        scope.columnName = columnName;
        scope.reverse = !scope.reverse;
        angular.forEach(element.siblings(), function(element) {
          $element = $(angular.element(element).children()[0]);
          if($element.hasClass('glyphicon')) { $element.removeClass('glyphicon'); }
          if($element.hasClass('glyphicon-chevron-up')) { $element.removeClass('glyphicon-chevron-up'); }
          if($element.hasClass('glyphicon-chevron-down')) { $element.removeClass('glyphicon-chevron-down'); }
        });
        if(scope.reverse){
          angular.element(element.children()[0]).addClass('glyphicon');
          angular.element(element.children()[0]).removeClass('glyphicon-chevron-down');
          angular.element(element.children()[0]).addClass('glyphicon-chevron-up');
        } else {
          angular.element(element.children()[0]).addClass('glyphicon');
          angular.element(element.children()[0]).removeClass('glyphicon-chevron-up');
          angular.element(element.children()[0]).addClass('glyphicon-chevron-down');
        }
        scope.$apply();
      });
    }
  };
});

surveyApp.directive("surveyProfilePopup", ['$compile', function($compile){
  return{
    restrict: 'A',
    controller: ['$scope', '$location', function($scope, $location){
      this.openPopup = function(){
        if($location.path() == "/survey_profiles/sorting/new") {
          $scope.selectedSurveyType = "Sorting Survey";
        } else if($location.path() == "/survey_profiles/image/new"){
           $scope.selectedSurveyType = "Image Survey";
        }
        var popup = angular.element("<div ng-include=\"'survey_profiles/choose_survey_type.html'\"></div>");
        angular.element("#survey_type_popup").html(popup);
        $compile(popup)($scope);
        $scope.$apply();
      },
      this.closePopup = function(){
        angular.element("#survey_type_popup").html("");
      },
      this.openNewSurveyForm = function(){
        var selectedSurveyType = angular.element(".profile_survey_type.active").text().trim();
        $scope.selectedSurveyType = selectedSurveyType;
        $scope.$apply();
        angular.element("#survey_type_popup").html("");
      }
    }],
    link(scope, element, attributes, ctrl){
      element.on('click', function(){
        var dataAction = element.attr('data-action');
        if(dataAction == "open") {
          ctrl.openPopup();
        } else if(dataAction == "close") {
          ctrl.closePopup();
        } else if(dataAction == "next") {
          ctrl.openNewSurveyForm();
        }
      });
    }
  }
}]);

surveyApp.directive('ngFileDrop', function(){
  return {
    link: function($scope,element){
      element.bind("drop", function(event){
        var reader = new FileReader();
        var file = event.originalEvent.dataTransfer.files[0];
        reader.onload = onLoadFile;
        reader.readAsDataURL(file);

        function onLoadFile(event) {
          $scope.imageSrc = event.target.result;
          $scope.$apply();
          angular.element("#dropped-image-div").removeClass('hide');
          angular.element("#drag-image-label").addClass('hide');
        }
      });
    }
  }
});
surveyApp.directive('removeDroppedImage', function(){
  return {
    link: function($scope,element){
      element.bind("click", function(event){
        angular.element("#drag-n-drop-box").attr('ng-src', '');
        angular.element("#dropped-image-div").addClass('hide');
        angular.element("#drag-image-label").removeClass('hide');
      });
    }
  }
});
