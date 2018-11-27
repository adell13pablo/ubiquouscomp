const express = require('express');
const app = express();
const server = require('http').Server(app);  //Express initializes app to be function handler that you can supply to an HTTP server
const io = require('socket.io')(server); //socket io is formed by the server and the client part. we use it to communicate both. Here we initialize the socket passing the server reference
var path = require('path');
var Bean = require('ble-bean');
var beanStream = require('ble-bean-stream'); //Transforma datos de Bean a JSON escuchando en el puerto serial
const _ = require('lodash');
var users = [];
var rules = [];
var socket;
var username;

var x_axis_old;
var y_axis_old;
var z_axis_old;
/*app.get('/', function (req, res) { //gets called when we hit our website home.
//res.send('Hello, this is my server!'); //Express sets up the landpage of the server, sending info
//However, setting the html like this can be a little bit messy, that is why we create a index.html that would be loaded when we hit our website home
res.sendFile(__dirname + '/index.html');

});*/

//app.use(express.static(path.join(__dirname, 'public'))); //Line to make css files, that are static, public so that the clients can retrieve them

io.on('connection', function(socket){ //It fires its own connection event when the user is connected
	this.socket = socket;
	console.log('User connected');
	var index = users.indexOf(username); //Checking if the user has any open session that it has not been closed
	if(index > -1){
		console.log("User has an open session");
		username = users[index];
		io.emit('session_on', {msg: 'user has session on'});
	}

socket.on('disconnect', function(){ // It also has its own disconnection event that fires when user close a tab
	io.emit('user_out', {msg : 'user' + username + ' is out, peace'});
	var index = users.indexOf(username);

	});
	socket.on('user_logged', function(msg){
		var index = users.indexOf(msg.user); //Checking if the user has any open session that it has not been closed
		if(index > -1){
			console.log("User has an open session");
			username = users[index];
		}else{
			username =  msg.user;
			users.push(username+index);
			console.log("Login new user" + users.length);

		}


	});

socket.on('logged_out', function(msg){
		var index = users.indexOf(username);
		console.log(username + " Out");
		if (index > -1) { //Take user out of the user array if it clicks log out
	  	users.splice(index, 1);
	}
	});

	});




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
