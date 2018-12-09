// TO INCLUDE IN THE FINAL APP
var mongoose = require('mongoose');
var myStorage = require('./Storage.js');
storage = myStorage.DButilites;

console.log(storage);
console.log("program start");

// connect to db
var dbName = 'icarusapp'
mongoose.connect('mongodb://localhost/' + dbName, { useNewUrlParser: true , useCreateIndex: true });


// check connection status
var db = mongoose.connection;
// error handler connection to db
db.on('error', console.error.bind(console, 'connection error:'));
// TILL HERE MUST BE INCLUDED THEN JUST FUNCTIONS WHEN NEEDED



// example storing user

db.once('open', function() {
	storage.storeUserInMyDB('javi99', 'javi', 'rodri', 'javi.rodri@gmail.com', 'bellapw', '1234567890');
	storage.storeUserInMyDB('lowei892', 'lowei', 'gri', 'lowei.gri@outlook.com', 'frerpw', '23232323');
});

// check storage error
/*
db.once('open', function() {
	storage.storeUserInMyDB('javi99', 'prova', 'prova', 'prova', 'prova', 'prova');
});
*/
// example storing receipt

db.once('open', function() {
	storage.storeReceiptInMyDB('javi99', 'temp>5', 'evening', 'red led');
	storage.storeReceiptInMyDB('javi99', 'hour<8am', 'hour>=7am', 'prepare coffe');
	storage.storeReceiptInMyDB('javi99', 'hour<6am', 'hour>=10am', 'green led');
	storage.storeReceiptInMyDB('javi99', 'hour<8am', 'secondcond', 'prepare coffe');
});

// example finding token by username
/*
db.once('open', function() {
	storage.findUserTokeninMyDB('javi99', queryHandler);
});
*/
// example finding receipt by username
/*
db.once('open', function() {
	storage.findUserReceiptsMyDB('javi99', queryHandler);
});
*/

function queryHandler(result) {
	console.log('result: ' + result);
};

// example updating stored receipt active/not active
/*
db.once('open', function() {
	id = "5bfd4c4d11b749126027971b";
	storage.changeReceiptState(id, function(){console.log("receip with id "+id+" changed state");});
});
*/

// example deleting stored receipt

console.log("program finish");

// add token
// delete token
