var mongoose = require('mongoose'), Schema = mongoose.Schema;
var UserSchema = new Schema({
	username: {type:String, unique: true},
	password : String,
	first_name : String,
	last_name : String,
	email : String,
	age : Number
});
mongoose.model('User', UserSchema);
