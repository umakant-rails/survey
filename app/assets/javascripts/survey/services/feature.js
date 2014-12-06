function Feature($resource){
  return $resource('/features/:id.json', null, {
    'all': {method:'GET'} ,
    'create': {method:'POST'}
  });
};
surveyApp.service('Feature', ['$resource', Feature]);
