var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var path = require('path');
var io = require('socket.io')(http);

const port = 3000;

var main = require('./routes/main.js');
var login = require('./routes/login.js');
var register = require('./routes/register');
var db = require('./db.js');

app.set('socketio', io);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true })); 


//IMPORTANT!!!!!!!!
//RUN THIS CODE ONLY ONCE, THEN DELETE IT
/*db.query('ALTER TABLE users ADD email VARCHAR(255)', function(err, result){
	if (err) throw err;
	console.log("email field added");
});*/




db.query('CREATE DATABASE IF NOT EXISTS MainDatabase', function(err){
	if (err) throw err;
	console.log("MainDatabase created");
	var sql = 'CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), email VARCHAR(255))';
	db.query(sql, function (err, result){
		if (err) throw err;
		console.log("Users table created");
	});
});

app.use('/', main);
app.use('/login', login);
app.use('/register', register);
	
http.createServer(app).listen(port);

console.log("Server running...");
	