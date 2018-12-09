var socket = io.connect('http://localhost:3000');;
var googleURL;
socket.on("googleURL", (data) => {
	console.log(data);
	googleURL = data.url;
});


document.getElementById("oauth").addEventListener('click', () =>{

	window.open(googleURL);

});

document.getElementById("main_title").innerHTML = "Hello, " + localStorage.getItem("actualUserName");
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
   

  }

socket.emit("request_user", {email:  localStorage.getItem("actualUserName")});



window.alert("User logged actually is: \n"+ localStorage.getItem('actualUser'));


