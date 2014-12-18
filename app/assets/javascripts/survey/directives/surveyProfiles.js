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
    link: function(scope, element, attributes, ctrl){
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

surveyApp.directive('setImageOnCanvas', function(){
  return {
    restrict: 'A',
    controller: ['$scope', 'growl', function($scope, growl){
      this.markClickedArea = function(event, context){
        if($scope.question_counter < 3) {
          var offset = $(event.target).offset();
          var xCoordinate = (event.pageX - offset.left);
          var yCoordinate = (event.pageY - offset.top);
          context.fillStyle = $scope.image_survey_questions[$scope.question_counter]['marking_color']; //"#DFA6B1";
          context.beginPath();
          context.globalAlpha = 0.7;
          context.arc(xCoordinate,yCoordinate, 15, 0 , Math.PI*2,true);
          context.closePath();
          context.fill();
          this.setCoordinates(xCoordinate, yCoordinate);
          this.enableNextButton();
          $scope.question_counter = $scope.question_counter + 1;
          if($scope.question_counter < 3) {
            var survey_question = $scope.image_survey_questions[$scope.question_counter]['question'];
            angular.element("#image_survey_question").html(survey_question);
          } else {
            angular.element("#image_survey_question").html("");
          }

          $scope.$apply();
        } else{
          this.showErrorMessage();
        }
      },
      this.setCoordinates = function(xCoordinate, yCoordinate){
        $scope.image_survey_questions[$scope.question_counter]['xCoordinate'] = xCoordinate;
        $scope.image_survey_questions[$scope.question_counter]['yCoordinate'] = yCoordinate;
      },
      this.showErrorMessage = function(){
        $scope.survey_question = "";
        growl.addErrorMessage('You have completed your survey. Now click on next.');
        $scope.$apply();
      },
      this.enableNextButton = function(){
        if(angular.element("#image_feedback_next_btn").hasClass('disabled')){
          angular.element("#image_feedback_next_btn").removeClass('disabled');
        }
      },
      this.createCanvase = function(canvas, context) {
        base_image = new Image();
        base_image.src = $scope.image.image_url;
        base_image.onload = function(){
          canvas.width = base_image.width;
          canvas.height = base_image.height;
          if(canvas.width > 752){
            canvas.width = 750;
          }
          if(canvas.height > 752){
            canvas.height = 750;
          }
          context.drawImage(base_image, 0, 0, base_image.width, base_image.height);
        }
      };
    }],
    link: function(scope, element, attributes,ctrl){
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      ctrl.createCanvase(canvas, context);
      element.on('click', function(event){
        ctrl.markClickedArea(event, context)
      });
    }
  }
});

surveyApp.directive('displayFeedbackReport', ['$q', function($q){
  return {
    restrict: 'A',
    controller: ['$scope', 'growl', function($scope, growl){

      this.markClickedArea = function(context){
        angular.forEach($scope.image_survey_feedbacks, function(image_survey_feedback){
          var xCoordinate = image_survey_feedback.xcoordinate;
          var yCoordinate = image_survey_feedback.ycoordinate;
          context.fillStyle = image_survey_feedback.marking_color;
          context.beginPath();
          context.globalAlpha = 0.7;
          context.arc(xCoordinate,yCoordinate, 15, 0 , Math.PI*2,true);
          context.closePath();
          context.fill();
        });

      },

      this.createCanvase = function(canvas, context) {
        base_image = new Image();
        base_image.src = $scope.image.image_url;
        base_image.onload = function(){
          canvas.width = base_image.width;
          canvas.height = base_image.height;
          if(canvas.width > 752){
            canvas.width = 750;
          }
          if(canvas.height > 752){
            canvas.height = 750;
          }
          context.drawImage(base_image, 0, 0, base_image.width, base_image.height);
        }
      }
    }],
    link: function(scope, element, attributes,ctrl){
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d');
      var is_executed = false;
      ctrl.createCanvase(canvas, context);
      setInterval(function(){
        var width = angular.element("#myCanvas").attr('width');
        if(width != undefined && is_executed == false){
          ctrl.markClickedArea(context);
          is_executed = true;
        }
      }, 500);
    }
  }
}]);
