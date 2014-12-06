function Feature($resource){
  return $resource('/features/:id.json', null, {
    'new': {method:'GET'}
  });
};
surveyApp.service('Feature', ['$resource', Feature]);
