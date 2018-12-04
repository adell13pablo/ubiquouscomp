var socket = io.connect('http://localhost:3000');
console.log("pasa2");



document.getElementById("recoverAccount").addEventListener('click', (data)=>{

	console.log("pasa");
	var email = document.getElementById('email').value;

	if(email === "")
		return;
	
	socket.emit('recoverAccount', {email: email});

	socket.on('recoverPasswordTrue', (data)=>{
		window.alert("Your password has been sent to your email account");
		location.href="../index.html";
	});

	socket.on('recoverPasswordFalse', (data)=>{
		window.alert("The email writen does not belong to any account");
	});
});
