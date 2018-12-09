/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


var socket;
var exit = 1;
//var googleURL;
var app = {
    // Application Constructor
    initialize: function() {
      console.log("Dentro");
      socket = io.connect('http://localhost:3000');
    }
};



app.initialize();
/*socket.on("googleURL", (data) => {
	console.log(data);
	googleURL = data.url;
});


document.getElementById("oauth").addEventListener('click', () =>{

	window.open(googleURL);

});*/



document.getElementById("btnSubmit").addEventListener('click', () =>{

	var username = document.getElementById('emailLogin').value;
	var pass = document.getElementById('passwordLogin').value;

	if((username === "") || (pass === ""))
		return;
	
	socket.emit('signIn', {username: username, password: pass});

	socket.on('logUserTrue',(data)=>{
		console.log("valid user");
		exit = 0;
		localStorage.setItem('actualUser', username);
		socket.emit('user_logged', {userMail: username});
		sessionStorage.setItem('username', username);
		location.href="../pages/home.html";
	});

	socket.on('logUserFalse', (data)=>{
		console.log("User does not exist");
		window.alert("User does not exist");
	});
});

document.getElementById("recoverAccount").addEventListener('click',()=>{
	exit = 0;
});

document.getElementById("newAccount").addEventListener('click',()=>{
	exit = 0;
});



function onSignIn(googleUser) {

	console.log(googleUser);
	var profile = googleUser.getBasicProfile();
	console.log("Profile is" + profile);
          var id_token = googleUser.getAuthResponse().id_token;
          socket.emit("googleUserID", {gogleID: id_token,
          								email: profile.getEmail(),
          								name: profile.getGivenName(),
          								surname: profile.getFamilyName(), 
          								googleID: profile.getId() });


        localStorage.setItem('actualUser', profile.getEmail());
        localStorage.setItem('actualUserName', profile.getGivenName());
		socket.emit('user_logged', {userMail: profile.getEmail()});
		sessionStorage.setItem('username', profile.getEmail());
    window.location.href='/pages/home.html';
          }


  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    
  }


    

/*
	NOTIFY THE SERVER THAT THE USER HAS LOGGED OUT
*/
function goodBye(){
	if(exit === 1){
		window.alert("GoodBye again");
		socket.emit('logged_out', {userMail: sessionStorage.getItem("User").email});
	}
}
