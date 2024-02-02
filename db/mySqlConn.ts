var mysql = require('mysql');

var connector = mysql.createConnection({
	host: 'my-db-instance.cbmc0gog4s2w.us-east-1.rds.amazonaws.com',
	port: 3306,
	database: 'users_db',
	user: 'admin',
	password: 'userPhoto5',
});

connector.connect(function (err) {
	if (err) throw err;
	console.log('Connected!');
});

module.exports = connector;
