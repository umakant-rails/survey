function surveyProfileService($resource){
  return $resource('/survey_profiles/:id.json', null, {
    'all': {method:'GET'} ,
    'userSurveyProfile': {method:'GET'} ,
    'create': {method:'POST'}
  });
};
surveyApp.service('surveyProfileService', ['$resource', surveyProfileService]);
