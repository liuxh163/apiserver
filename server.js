'use strict';

var path = require('path'),
  restify = require('restify'),
  config   = require('./config/'),
  logging = require('./src/logger'),
  fs = require('fs'),
  privateKey = fs.readFileSync('/Users/liuxinghao/Documents/wksapce/nodeserver/ca/private.pem', 'utf8'),
  cert = fs.readFileSync('/Users/liuxinghao/Documents/wksapce/nodeserver/ca/file.crt', 'utf8'),
  jwt = require('express-jwt');

// Set up logging
var logger = logging.createLogger(config.logs);

var serverConfig = {
  name: require(path.join(__dirname, 'package')).name,
  version: require(path.join(__dirname, 'package')).version,
  key: privateKey,
  certificate: cert,
  log: logger
};



var server = restify.createServer(serverConfig);
server.use(jwt({secret: "secret"}).unless({path:["/login"]}));
require('./src/routes')(server);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());

server.on('NotFound', function (req, res, next) {
	req.log.warn('404', 'Request for ' + req.url + ' not found. No route.');
	res.send(404, req.url + ' was not found');
});

module.exports = server;
