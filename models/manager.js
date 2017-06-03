var mongoose = require('mongoose');



var managerSchema = new mongoose.Schema({
	username:String,
	password:String,
	email:String,
	remember:Number
});

module.exports = mongoose.model('Manager',managerSchema);