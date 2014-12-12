surveyApp.directive("sortDataTable", function () {
  return {
    restrict: "A",
    link: function(scope, element, attributes, ctlr) {
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
