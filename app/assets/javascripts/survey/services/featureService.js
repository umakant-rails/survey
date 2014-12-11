function featureService($resource){
  return $resource('/survey_profiles/:survey_profile_id/features/:id.json', null, {
    'all': {method:'GET'} ,
    'create': {method:'POST'}
  });
};
surveyApp.service('featureService', ['$resource', featureService]);
