const dbConn = require('../db/mySqlConn.ts');
const {
	VALID_LOGIN,
	INVALID_PASSWORD,
	USER_NOT_FOUND,
	USER_ALREADY_EXISTS,
} = require('../db/index.ts');

// const VALID_LOGIN = require('../constants/index.ts');
// console.log(dbConn);

// const VALID_LOGIN = 'VALID_LOGIN';
// const INVALID_PASSWORD = 'INVALID_PASSWORD';
// const USER_NOT_FOUND = 'USER_NOT_FOUND';

const getByEmail = async (email, tableName = 'users') => {
	const queryStr = `SELECT * FROM ${tableName} WHERE email='${email}'`;
	console.log(queryStr);
	dbConn.query(queryStr, function (err, result, fields) {
		if (err) throw err;
		console.log(result);
	});
};

// console.log(getByEmail('person1@mail.com'));

const validateRegister = async (email, name, password, response) => {
	console.log(email);
	const userExists = `SELECT * FROM users WHERE email='${email}'`;
	dbConn.query(userExists, function (err, result, _) {
		console.log(result);
		if (err) throw err;
		if (result.length > 0) {
			console.log(USER_ALREADY_EXISTS);
			response.status(401).send(USER_ALREADY_EXISTS);
			return;
		}
		console.log('should bsuccess ');
		const insertQry = `INSERT INTO users SET name= '${name}', email= '${email}', password='${password}'`;
		dbConn.query(insertQry, function (err, result, _) {
			console.log(result);
			if (err) throw err;
			console.log('should bsuccess ');
			response.status(201).send();
		});
	});
};

const validateLogin = async (response, email, password) => {
	console.log(email);
	const queryStr = `SELECT * FROM users WHERE email='${email}'`;
	console.log(queryStr);
	let resp;
	await dbConn.query(queryStr, function (err, result, _) {
		if (err) throw err;

		if (result.length === 0) {
			console.log('send back-->', USER_NOT_FOUND);
			console.log(result);
			response.status(401).send(USER_NOT_FOUND);
		} else {
			if (result[0].password === password) {
				console.log('option B valid');
				const newQry = `SELECT * FROM users WHERE email='${email}'`;
				dbConn.query(newQry, function (err, res, _) {
					if (err) throw err;
					const userId = result[0].personId;
					const data = { msg: VALID_LOGIN, userId: userId };
					response.json(data);
				});
			} else {
				console.log('returning C invalid');
				// console.log(result[0].password, password);
				response.status(401).send(INVALID_PASSWORD);
			}
		}
	});
	console.log('resp', resp);
	return resp;
};

const uploadImgData = async (response, uid, url) => {
	const query = `INSERT INTO images SET personId='${uid}', url= '${url}'`;
	console.log(query);
	await dbConn.query(query, function (err, result, _) {
		if (err) throw err;
		response.status(201).send();
	});
};
const retrieveImgData = async (response, uid) => {
	const query = `SELECT * FROM images WHERE personId='${uid}'`;
	console.log(query);
	await dbConn.query(query, function (err, result, _) {
		if (err) throw err;
		const data = result;
		response.json(data);
	});
};
module.exports = {
	validateLogin,
	validateRegister,
	uploadImgData,
	retrieveImgData,
};
