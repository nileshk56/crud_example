var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session:expressSession});
var mongoose = require('mongoose');

var conn = mongoose.connect('mongodb://localhost/test');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
	secret:'nilesh56',
	//store: new mongoStore({db:mongoose.connection.db, collection:'sessions'})
	db: new mongoStore({ mongooseConnection: mongoose.connection })
}));

require('./routes')(app);
app.listen(5600);
