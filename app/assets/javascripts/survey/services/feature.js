function Feature($resource){
  return $resource('/features/:id.json', null, {
    'new': {method:'GET'} ,
    'create': {method:'POST'}
  });
};
surveyApp.service('Feature', ['$resource', Feature]);
