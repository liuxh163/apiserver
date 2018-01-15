var fileV1 = require('../api/v1/fileCtrl');

module.exports = function(server){
  server.get('/files/download/:pathfilename', fileV1.download);
  server.post('/files/upload/', fileV1.upload);
  server.get('/files/fetch/:pathfilename', fileV1.fetch);
}
