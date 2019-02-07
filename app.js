var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();

const port = 3000;
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "pamacs2000",
	port: "3306",
//	database: ""
});

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true })); 

connection.connect(function(err){
	if (err) throw err;
	console.log("Database connected!");
});

app.get('/', function(req, res){
	res.send("Hello World");
});

http.createServer(app).listen(port);

console.log("Server running...");