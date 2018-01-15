var User = require('../../models').User;

exports.getAll = function(req,res,next){
	console.log('get all users');
	User.find(function(err, users){
		if (err) return;
		res.send(users)
	});
};

exports.getByName = function(req,res,next){
	User.find({name: req.params.name},function(err, user){
		if (err) return;
		res.send(user)
	});
};
