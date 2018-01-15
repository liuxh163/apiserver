var PATH = "/users";
var user = require('../api/userCtrl');

// version #1
var userV1 = require('../api/v1/userCtrl');
var PATHV1 = "/v1/users";
module.exports = function(server){
  server.get({path: PATH, version: '1.0.1'}, userV1.getAll);
  server.get({path: PATHV1 + '/:name', version: ['1.0.1','1.0.2']}, userV1.getByName);
}
