const express = require('express');
const app = express();
const server = require('http').Server(app);  //Express initializes app to be function handler that you can supply to an HTTP server
const io = require('socket.io')(server); //socket io is formed by the server and the client part. we use it to communicate both. Here we initialize the socket passing the server reference
var path = require('path');
var Bean = require('ble-bean');
var beanStream = require('ble-bean-stream'); //Transforma datos de Bean a JSON escuchando en el puerto serial
const _ = require('lodash');

/* MongoDB required packages */
var mongoose = require('mongoose');
var myStorage = require('./Storage.js');
storage = myStorage.DButilites;
// connect to db
var dbName = 'projectUbicua'
mongoose.connect('mongodb://localhost/' + dbName, { useNewUrlParser: true , useCreateIndex: true });

// check connection status
const db = mongoose.connection;
console.log("DATABASE: "+db);
// error handler connection to db
db.on('error', console.error.bind(console, 'connection error:'));


var users = [];
var rules = [];
var socket;
var username;

var x_axis_old;
var y_axis_old;
var z_axis_old;
var temperature_local;
var luminosity_local;
var acceleration_local;
var date_local;
var time_local;
var date_time_local;
/*app.get('/', function (req, res) { //gets called when we hit our website home.
//res.send('Hello, this is my server!'); //Express sets up the landpage of the server, sending info
//However, setting the html like this can be a little bit messy, that is why we create a index.html that would be loaded when we hit our website home
res.sendFile(__dirname + '/index.html');

});*/

//app.use(express.static(path.join(__dirname, 'public'))); //Line to make css files, that are static, public so that the clients can retrieve them

io.on('connection', (client) =>{ //It fires its own connection event when the user is connected
	
	console.log('User connected');
	var index = users.indexOf(username); //Checking if the user has any open session that it has not been closed
	if(index > -1){
		console.log("User has an open session");
		username = users[index];
		io.emit('session_on', {msg: 'user has session on'});
	}

client.on('disconnect', () =>{ // It also has its own disconnection event that fires when user close a tab
	io.emit('user_out', {msg : 'user' + username + ' is out, peace'});
	var index = users.indexOf(username);

	});
	client.on('user_logged', (msg) =>{
		var exists = users.indexOf(msg.userMail); //Checking if the user has any open session that it has not been closed
		console.log("does user "+msg.userMail+" exist? -Answer:  "+exists)
		if(exists > -1){
			console.log("User has an open session");
			username = users[exists];
		}else{
			username =  msg.userMail;
			users.push(username);
			console.log("Login new user" + users.length);
		
		}


	})

socket.on('logged_out', (msg)=>{
		var index = users.indexOf(msg.userMail);
		console.log("User "+msg.userMail+" is trying to log out");
		if (index > -1) { //Take user out of the user array if it clicks log out
			console.log(msg.userMail + " Out");
	  		users.splice(index, 1);
		}
	});

	});


/*
		RECEIVE A NEW ACCOUNT CREATION REQUEST
	*/
	client.on('createAccount', (data)=>{
		console.log("New user information:\n  Username: "+ data.username +"\n Name: "+ data.name + "\n  Surname: "+ data.surname + "\n  Email: "+ data.email + "\n  Password: "+ data.password);
		/*
			INSERT DATA INTO THE DATABASE AS A NEW USER
		*/
		console.log("DATABASE: "+db);
		
		console.log("usuario creado");
		storage.storeUserInMyDB(data.username, data.name, data.surname, data.email, data.password, '1234567890');
		console.log("usuario creado");

		/*Promise.all(promises)
		.then(function() { console.log("user stored"); })
		.catch(console.error);*/

		client.emit('userCreated');
	});

	/*
		RECEIVE SIGN IN REQUEST FROM A USER
	*/
	client.on('signIn', (data)=>{
		console.log("User "+data.username+" signed in, its password is: "+data.password);
		/* Check if the user exists in the database */

		storage.findUserInMyDB(data.username, (result)=>{
			if(result != null){
				if(result.password == data.password){
					client.emit('logUserTrue');
				}
				else{
					client.emit('logUserFalse');
				}
			}else{
				client.emit('logUserFalse');
			}
		});

	});

	/*
		RECOVER ACCOUNT PASSWORD REQUEST
	*/
	client.on('recoverAccount', (data)=>{
		/*
			Check if the email written belongs to a user
		*/
		/*
			If email belongs to a user:
		*/
		console.log("Send password whose email is: "+data.email);
		client.emit('recoverPasswordTrue');
		/*
			If email does not belong to any user: 
		*/
		//client.emit('recoverPasswordFalse');
	});

	client.on('loadReceipts', (data)=>{
		console.log("Load receipts of user: "+data.user);

		storage.findUserReceiptsMyDB(data.user, function(result){
			client.emit('receiptsReady', { receipts: result });
		});

		/*Retrieve receipts of the given user*/
		
	});

	client.on('newReceipt', (data)=>{
		/* Insert into the database the new receipt for the given user -> elements of the receipt are inside "()" */
		console.log("Username: "+data.user+"\nDescription: "+data.description);

		var conditionsSplit = data.description.split(" THEN ");

		var condition1 = conditionsSplit[0].split(" AND ")[0].substring(3);
		var condition2 = conditionsSplit[0].split(" AND ")[1];
		if (condition2 == null){
			condition2 = "";
		}
		var action = conditionsSplit[1];

		storage.storeReceiptInMyDB(data.user, condition1, condition2, action);

	});

	client.on('updateReceiptState', (data)=>{
		/* Update state of the received receipt==> true = activated & false = deactivated */

		console.log("Update receipt "+data.receiptID+"(ID) of "+data.user+"(username) to state "+data.state);
		storage.changeReceiptState(data.receiptID, function(){console.log("receip with id "+data.receiptID+" changed state");});
	});

});

function getReceiptsHandler(result) {
	//console.log('result: ' + result);
	receipts = result;
};






server.listen(3000, function () { //Function lo listen to port 3000,when loading  http://localhost:3000/  displays the content of the get function
console.log('Listening to port 3000');
console.log('Discovering Bean');
Bean.discover(function(bean){
	if(bean.id == '987bf3591d4e'){
		myBean = bean;
		bean.connectAndSetup(function(){

			console.log("Bean connected");

			bean.notifyThree(function(data){
		if(data){
			console.log("Scratch Three(Luminosidad):" + data.readUInt8(0));
			evaluateLight(data.readUInt8(0));

	}
			}, function(error){
				if(error) console.log("error on Three > ", error)
			});


			bean.notifyFour(function(data){
			if(data){
				console.log("Scratch Four (Button):" + data.readUInt8(0));
				evaluateButton(data.readUInt8(0));
			}
			}, function(error){
				if(error) console.log("error on Four > ", error);
			});

			setInterval(function(){
					//('Asking the bean for acceleration');
					bean.requestAccell(acceleration);
				}, 1000);

			setInterval(function(){
						//('Asking the bean for acceleration');
						bean.requestTemp(temperature);
					}, 1000);


			var acceleration = () => {
				bean.on('accell', function(x, y, z){
					console.log("X: " + x + "Y: " + y + "Z: " + z);
					var shake = Math.sqrt(x*x+y*y+z*z);
					if(shake >= 2.0){
						console.log('shake');
						return "shake";
					}
				});
			}

		 	var temperature = () =>	{
				bean.on('temp', function(temp){
					console.log("Temperatura es: " + temp);
					return temp;
				});
			}


		});

	}
});
 //Evaluation Functions
function evaluateLight(data){
	console.log(data);
if(data < 40){

		var buffer = new Buffer(1);
		buffer[0] = 1;
		myBean.writeThree(buffer, function(){console.log("Lights up");});

}else{
	var buffer = new Buffer(1);
	buffer[0] = 0;
	myBean.writeThree(buffer, function(){console.log("Lights down");});

}
}

function evaluateButton(data){
	if(data === 1){
		var buffer = new Buffer(1);
		buffer[0] = 1;
		myBean.writeFour(buffer, function(){console.log("Playing tune");});
	}
}




});
