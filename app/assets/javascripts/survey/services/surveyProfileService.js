function surveyProfileService($resource){
  return $resource('/survey_profiles/:id.json', null, {
    'all': {method:'GET'} ,
    'show': {method:'GET'} ,
    'edit': {url: '/survey_profiles/:id/edit.json', method:'GET'} ,
    'update': {method:'PUT'} ,
    'userSurveyProfile': {method:'GET'} ,
    'create': {method:'POST'},
    'delete': {method:'DELETE'},
    'surveyImageProfileShow': {url: '/survey_profiles/:id/image_survey_show.json', method: 'GET'},
    'saveImageProfileFeedback': {url: '/survey_profiles/image_profile_feedback.json', method: 'POST'}
  });
};
surveyApp.service('surveyProfileService', ['$resource', surveyProfileService]);
