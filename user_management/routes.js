var crypto = require('crypto');
var express = require('express');

module.exports = function(app) {
	var users = require('./controllers/users_controller');	
	app.use('/static', express.static('./static')).use('/lib', express.static('../lib'));
	
	app.get('/', users.index);

	app.get('/signup', users.signUpForm);

	app.get('/login', function(req, res){
		if(req.session.username)
		{
			res.redirect('/');
		}
		res.render('login');
	});

	app.get('/user/profile', users.getUserProfile);
	app.get('/update', users.updateForm);
	app.get('/delete', users.deletes);

	app.post('/signup', users.signup);
	app.post('/update', users.update);
	app.post('/login', users.login);
	
};
