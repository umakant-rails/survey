function featureFeedbackService($resource){
  return $resource('/survey_profiles/:survey_profile_id/feature_feedbacks/:id.json', null, {
    'create': {method:'POST'},
    'featureFeedbackReport': {url: '/survey_profiles/:survey_profile_id/feature_feedbacks/feature_feedback_report.json', method: 'GET'}
  });
};
surveyApp.service('featureFeedbackService', ['$resource', featureFeedbackService]);
