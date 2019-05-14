var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');

const port = 3000;
global.io = io;

var play = require('./routes/play.js');
var main = require('./routes/main.js');
var login = require('./routes/login.js');
var register = require('./routes/register.js');
var db = require('./middlewares/db.js');
var linewars = require('./routes/linewars.js');
var gameoflife = require('./routes/gameoflife.js');
var langtonsant = require('./routes/langtonsant.js');
var mandelbrot = require('./routes/mandelbrot.js');

//app.set('socketio', io);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

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

	var createBlacklistQuery = 'CREATE TABLE IF NOT EXISTS blacklist (id INT AUTO_INCREMENT PRIMARY KEY, expireDate DATETIME, token VARCHAR(500))';
	db.query(createBlacklistQuery, function (err, result){
		if (err) throw err;
		console.log("Blacklist table created");
	});
});

app.use('/', main);
app.use('/login', login);
app.use('/register', register);
app.use('/play', play);
app.use('/linewars', linewars);
app.use('/gameoflife', gameoflife);
app.use('/langtonsant', langtonsant);
app.use('/mandelbrot', mandelbrot);

	
http.listen(port);

console.log("Server running...");
	