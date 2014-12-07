surveyApp.factory('featureFactory', function() {
  featureFactory = {};
  featureFactory.interestedFeature = [];
  featureFactory.nonInterestedFeature = [];
  featureFactory.setInterestedFeature = function(feature) {
    featureFactory.interestedFeature = feature;
  };
  featureFactory.getInterestedFeature = function() {
    return featureFactory.interestedFeature;
  };
  featureFactory.setNonInterestedFeature = function(feature) {
    featureFactory.nonInterestedFeature = feature;
  };
  featureFactory.getNonInterestedFeature = function() {
    return featureFactory.nonInterestedFeature;
  }
  return featureFactory;
});
