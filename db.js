var mysql = require('mysql');
var db;

function connectDatabase(){
	if(!db){
		db = mysql.createConnection({
			host: "localhost",
			user: "root",
			password: "pamacs2000",
			port: "3306",
			//database: ""
		});
		db.connect(function(err){
			if (!err){
				console.log("Connection made to database");
			} else {
				console.log("Error connecting to database" + err.code);
			}
		});
	}
	return db;
}

module.exports = connectDatabase();