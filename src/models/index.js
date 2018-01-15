var mongoose = require('mongoose')
  , config = require('../../config/')
  , path = require('path')
  // , settings = config.readConfig(path.join(__dirname, '../../config/config.yaml'))

mongoose.connect(config.db, {
    server: {poolSize: 20}
  }, function (err) {
  if (err) {
    // logger.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./user');
require('./file');

exports.User = mongoose.model('User');
