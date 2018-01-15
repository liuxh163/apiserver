var User = require('../models').User;
var sha1 = require('sha1');
var jwt = require('jsonwebtoken');
var URL = require('url');

module.exports = function(server){
	/* GET home page. */
	server.get('/login', function(req, res, next) {
		var params = URL.parse(req.url, true).query;
		User.findOne({name: 'liuxh5'}, function (err, user) {
			if (err) return;
	    if(!user){
	    	console.log(!user);
			  res.status(401);
		  }else if (sha1(params.password) != user.pass){
			  res.status(401);
		  }else{
			  var authToken = jwt.sign({username:params.name}, "secret", {expiresIn: 600});
		    res.send(authToken);
		  };
	  });
	});
  require('./user')(server);
  require('./file')(server);
};
