function featureService($resource){
  return $resource('/features/:id.json', null, {
    'all': {method:'GET'} ,
    'create': {method:'POST'}
  });
};
surveyApp.service('featureService', ['$resource', featureService]);
