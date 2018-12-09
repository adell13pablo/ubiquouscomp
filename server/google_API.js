const {google} = require('googleapis');
/* MongoDB required packages */
var mongoose = require('mongoose');
var myStorage = require('./Storage.js');
storage = myStorage.DButilites;
var Usermodel = myStorage.User;
// connect to db
var dbName = 'icarusapp'
mongoose.connect('mongodb://localhost/' + dbName, { useNewUrlParser: true , useCreateIndex: true });

// check connection status
const db = mongoose.connection;
// error handler connection to db
db.on('error', console.error.bind(console, 'connection error:'));

const oauth2Client = new google.auth.OAuth2(
	'245262156183-pucpu4o1c95c2e6u3h41egkmataa7265.apps.googleusercontent.com',
	'vPdEjnEuEQszjzPrIe2HVArW',
	'http://localhost:3000/auth/oauthcallback'
	);

const SCOPES = ['https://www.googleapis.com/auth/gmail.compose',
'https://www.googleapis.com/auth/plus.me', 
'https://www.googleapis.com/auth/userinfo.email'];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: SCOPES
});

getCode = function authorizationClient(code){ //Execute whatever is needed for the actual user, returning access codes
	
	oauth2Client.getToken(code, function(err, tokens){
		if(!err){
			oauth2Client.setCredentials(tokens);
			
			var gmail = getGmailApi(oauth2Client);
			gmail.users.getProfile({auth: oauth2Client,userId: 'me'}, function(err, res) { //Get user email to store in db
				if (err) {
					console.log(err);
					null;
				} else {

					var user = res.data['emailAddress'];
					//console.log("USERR Is: " + user);
					//console.log("Token: " + tokens['access_token']);
					//console.log(" refresh_token: " + tokens['refresh_token']);
					var query = {'email': user};
					Usermodel.findOneAndUpdate(query, {token : tokens['access_token'], refresh_token: tokens['refresh_token'], is_authorized: true}, function(err, doc){
						if (err) console.log("Error " + err);
						else console.log("Update goooleID" + doc);

					});
					sendMessage(user, user, user, "Quin es tu papi", "Yo");
				}
			});
		}else{
			console.log("Error" + err);
		}
	});
}
function getGooglePlusApi(auth) {
	return google.plus({ version: 'v1', auth });
}

function getGmailApi(auth) {
	return google.gmail({ version: 'v1', auth });
}

function accessGmail(){
	oauth2Client.on('tokens', (tokens) => {
		if (tokens.refresh_token) {
    // store the refresh_token in my database!
    console.log(tokens.refresh_token);
}
console.log(tokens.access_token);
});
}

function makeBody(to, from, subject, message) {
	var str = ["Content-Type: text/plain; charset=\"UTF-8\"\n",
	"MIME-Version: 1.0\n",
	"Content-Transfer-Encoding: 7bit\n",
	"to: ", to, "\n",
	"from: ", from, "\n",
	"subject: ", subject, "\n\n",
	message
	].join('');

	var encodedMail = new Buffer(str).toString("base64").replace(/\+/g, '-').replace(/\//g, '_');
	return encodedMail;
}

function sendMessage(email,to, from, subject, message) {
	accessGmail();
	console.log("Sending  email");
	Usermodel.findOne({'email': email}, function(err, user){
		if(user.is_authorized){
			console.log("Autorizado");
			var gmail = getGmailApi(oauth2Client);
			console.log(user['is_authorized']);
			
				var raw = makeBody(to, from, subject, message);
				console.log("RRRAAW " + raw);
				gmail.users.messages.send({
					auth: oauth2Client,
					userId: 'me',
					resource: {
						raw: raw
					}
				}, function(err, response) {
					console.log(err || response);
				});
			
		}
		});
	
}





exports.googleURL = url;
exports.googleCodes = getCode;
exports.sendEmail = sendMessage;





