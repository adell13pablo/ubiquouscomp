// include module
var mongoose = require('mongoose');

var storage = {};

// users schema definition
var userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	name: String,
	surname: String,
	email: String,
	password: String,
	token: String,
	refresh_token: String, //Added to store user's refresh token
	last_connected: Date,
}, {minimize: false});

// users queries definition
userSchema.query.byUsername = function(username) {
	return this.where({ username: new RegExp(username, 'i') });
};

// receipts schema definition
var receiptSchema = new mongoose.Schema({
	username: String,
	firstCondition: String,
	secondCondition: String,
	action: String,
	active: Boolean
}, {minimize: false});

// receipts queries definition
receiptSchema.query.byUsername = function(username) {
	return this.where({ username: new RegExp(username, 'i') });
};

// models definition
var User = mongoose.model('User', userSchema);
var Receipt = mongoose.model('Receipt', receiptSchema);

//USERS
// store a user
storage.storeUserInMyDB = function (userUsername, userName, userSurname, userEmail, userPassword, userToken){
	var newUser = new User({username: userUsername, name: userName,
		surname: userSurname, email: userEmail,
		password: userPassword, token: userToken});
	newUser.save(function (err, newUser) {
		if(err) return console.error(err);
		console.log('stored new user:');
		console.log(newUser);
	});
};

// get the token with the given username
storage.findUserTokeninMyDB = function(username, callback) {
	User.findOne().byUsername(username).exec(function(err, user) {
	 	callback(user.token);
	});
};

// get the token with the given username
storage.findUserInMyDB = function(username, callback) {
	User.findOne().byUsername(username).exec(function(err, user) {
	 	callback(user);
	});
};

// RECEIPTS
// store a receipt
storage.storeReceiptInMyDB = function (receiptsUsername, receiptFirstCondition, receiptSecondCondition, receiptAction, receiptActive){
	var newReceipt = new Receipt({username: receiptsUsername, 
		firstCondition: receiptFirstCondition, secondCondition: receiptSecondCondition,
		action: receiptAction, active: false});
	newReceipt.save(function (err, newUser) {
		if(err) return console.error(err);
		console.log('stored new receipt:');
		console.log(newReceipt);
	});
};

// get the receipts with the given username
storage.findUserReceiptsMyDB = function(username, callback) {
	Receipt.find().byUsername(username).exec(function(err, receipts) {
	 	callback(receipts);
	});
};

// change the state of a stored receipt
storage.changeReceiptState = function(id, callback) {
	Receipt.findById(id, function (err, receipt) {
		if(receipt.active == false) {
			Receipt.updateOne({ _id: id }, { active: true }, callback);
		}
		else {
			Receipt.updateOne({ _id: id }, { active: false }, callback);
		}
	});
};

exports.DButilites = storage;