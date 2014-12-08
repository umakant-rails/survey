function featureFeedbackService($resource){
  return $resource('/feature_feedbacks/:id.json', null, {
    'create': {method:'POST'}
  });
};
surveyApp.service('featureFeedbackService', ['$resource', featureFeedbackService]);
