
// version #1
var userV1 = require('../api/v1/userCtrl');
module.exports = function(server){
  server.get('/v1/users/:name', userV1.getByName);
  server.get('/v1/users', userV1.getAll);
}
