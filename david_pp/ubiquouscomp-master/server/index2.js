const express = require('express');
const app = express();
const server = require('http').Server(app);  //Express initializes app to be function handler that you can supply to an HTTP server
const io = require('socket.io')(server); //socket io is formed by the server and the client part. we use it to communicate both. Here we initialize the socket passing the server reference
var path = require('path');
var users = [];
var rules = [];
var socket;
var username;
/*app.get('/', function (req, res) { //gets called when we hit our website home.
//res.send('Hello, this is my server!'); //Express sets up the landpage of the server, sending info
//However, setting the html like this can be a little bit messy, that is why we create a index.html that would be loaded when we hit our website home
res.sendFile(__dirname + '/index.html');

});*/

//app.use(express.static(path.join(__dirname, 'public'))); //Line to make css files, that are static, public so that the clients can retrieve them

io.on('connection', (client)=>{ //It fires its own connection event when the user is connected

	console.log('User connected');
	var index = users.indexOf(username); //Checking if the user has any open session that it has not been closed
	console.log("users array length: "+index);
	if(index > -1){
		console.log("User has an open session");
		username = users[index];
		io.emit('session_on', {msg: 'user has session on'});
	}

	client.on('disconnect', ()=> { // It also has its own disconnection event that fires when user close a tab
		console.log("user disconnected");
		client.emit('disconnected');
	});
	
	client.on('user_logged', (msg)=>{
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


	});

	client.on('logged_out', (msg)=>{
		var index = users.indexOf(msg.userMail);
		console.log("User "+msg.userMail+" is trying to log out");
		if (index > -1) { //Take user out of the user array if it clicks log out
			console.log(msg.userMail + " Out");
	  		users.splice(index, 1);
		}
	});






	/*
		RECEIVE A NEW ACCOUNT CREATION REQUEST
	*/
	client.on('createAccount', (data)=>{
		console.log("New user information:\n  Name: "+ data.name + "\n  Surname: "+ data.surname + "\n  Email: "+ data.email + "\n  Password: "+ data.password);
		/*
			INSERT DATA INTO THE DATABASE AS A NEW USER
		*/
		client.emit('userCreated');
	});

	/*
		RECEIVE SIGN IN REQUEST FROM A USER
	*/
	client.on('signIn', (data)=>{
		console.log("User "+data.email+" signed in, its password is: "+data.password);
		/* Check if the user exists in the database */
		/*
			If user exists then:
		*/
		client.emit('logUserTrue');
		/*
			If user does not exist in the database then:
		*/
		//client.emit('logUserFalse');
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

		/*Retrieve receipts of the given user*/
		client.emit('receiptsReady');
	});

	client.on('newReceipt', (data)=>{
		/* Insert into the database the new receipt for the given user -> elements of the receipt are inside "()" */
		console.log("Username: "+data.user+"\nDescription: "+data.description);
	});

	client.on('updateReceiptState', (data)=>{
		/* Update state of the received receipt==> true = activated & false = deactivated */

		console.log("Update receipt "+data.receiptID+"(ID) of "+data.user+"(username) to state "+data.state);
	});

});


server.listen(3000, function () { //Function lo listen to port 3000,when loading  http://localhost:3000/  displays the content of the get function
console.log('Listening to port 3000');
});
