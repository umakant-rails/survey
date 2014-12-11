function surveyProfileService($resource){
  return $resource('/survey_profiles/:id.json', null, {
    'all': {method:'GET'} ,
    'show': {method:'GET'} ,
    'edit': {url: '/survey_profiles/:id/edit.json', method:'GET'} ,
    'update': {method:'PUT'} ,
    'userSurveyProfile': {method:'GET'} ,
    'create': {method:'POST'},
    'delete': {method:'DELETE'}
  });
};
surveyApp.service('surveyProfileService', ['$resource', surveyProfileService]);
