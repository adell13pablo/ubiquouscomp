var socket = io.connect('http://localhost:3000');
socket.emit('session', window.sessionStorage);


document.getElementById("createAccount").addEventListener('click', ()=>{

	var username = document.getElementById('username').value;
	var name = document.getElementById('name').value;
	var surname = document.getElementById('surname').value;
	var email = document.getElementById('email').value;
	var pass = document.getElementById('password').value;
	var repeatPass = document.getElementById('passwordRepeat').value;

	if((username === "") || (name === "") || (surname === "") || (email === "" )|| (pass === "") || (repeatPass === ""))
		return;

	if(pass === repeatPass)
		socket.emit('createAccount', {username: username, name: name, surname: surname, email: email, password: pass});

	socket.on('userCreated', (data)=> {
		window.alert("Your account has been created");
		session.setItem('username', username);
		location.href="home.html";
	});
});