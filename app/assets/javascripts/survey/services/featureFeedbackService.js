function featureFeedbackService($resource){
  return $resource('/feature_feedbacks/:id.json', null, {
    'create': {method:'POST'},
    'featureFeedbackReport': {url: '/feature_feedbacks/feature_feedback_report.json', method: 'GET'}
  });
};
surveyApp.service('featureFeedbackService', ['$resource', featureFeedbackService]);
