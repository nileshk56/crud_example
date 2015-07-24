require('../models/users_model.js');
var crypto = require('crypto');
var mongoose = require('mongoose'), User = mongoose.model('User');

exports.index = function(req, res){
	var data = '';	
	var msg = "Guest";
	if(req.session.username)
		msg = req.session.username;

	User.find(function(err, user){
		data = user;
		res.render('index', {'username':msg, 'userdata':data});
	});
};

exports.signUpForm = function(req, res){
	if(req.session.username)
	{
		res.redirect('/');
	}
	res.render('sign_up_form');
}

exports.signup = function (req, res) {
	var user = new User({username:req.body.username});
	user.set('password', req.body.password);
	user.set('first_name', req.body.first_name);
	user.set('last_name', req.body.last_name);
	user.set('email', req.body.email);
	user.set('age', req.body.age);
	console.log(user);
	user.save(function(err){
		if(err)
			console.log(err);
		req.session.username = user.username;
		res.redirect('/');
	});
};


exports.login = function(req, res){
	User.findOne({username:req.body.username, password:req.body.password}).exec(function (err, user){
		if(!user)
		{
			err = "User Not Found";
			res.send(err);
		}
		else
		{
			req.session.username = user.username
			res.redirect('/');
		}
	});
};

exports.getUserProfile = function(req, res){
	User.findOne({username : req.session.username}).exec(function (err, user){
		res.json(user);
	});
};

exports.updateForm = function(req, res){
	username = req.query.username;
	User.findOne({'username' : username}).exec(function (err, user){
		res.render('update', {'data':user});
	});
};

exports.update = function(req, res){
	User.update({ username: req.body.username }, { $set: { username: req.body.username, first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email, password: req.body.password, age: req.body.age }}, function(){
		res.redirect('/');
	});
};


exports.deletes = function(req,res){
	User.remove({ username: req.query.username }, function(){
		res.redirect('/');
	});
};


