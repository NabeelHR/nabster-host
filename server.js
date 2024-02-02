const express = require('express');
const cors = require('cors');
const app = express();
const {
	validateLogin,
	validateRegister,
	uploadImgData,
	retrieveImgData,
} = require('./db/queries.ts');

app.use(express.json());
subs = [];
app.use(
	cors({
		origin: '*',
		credentials: true,
	})
);
const PORT = 8080;

app.get('/', (req, res) => {
	console.log('got reyeststst');
	res = { message: 'hello from the nice side', user: user };

	res.json();
});

app.post('/login', (req, res) => {
	console.log(req.body.email);
	try {
		validateLogin(res, req.body.email, req.body.password);
	} catch (error) {
		res.status(401).send('login failed');
	}
});

app.post('/register', async (req, res) => {
	validateRegister(req.body.email, req.body.name, req.body.password, res);
});

app.post('/imageData', async (req, res) => {
	console.log(req.body);
	try {
		uploadImgData(res, req.body.uid, req.body.url);
	} catch (error) {
		res.status(401).send();
	}
});

app.get('/fetchImgData', (req, res) => {
	console.log(req.body);
	try {
		retrieveImgData(res, req.query.uid);
	} catch (error) {
		res.status(401).send();
	}
});

app.listen(PORT, () => {
	console.log(`server has began at ${PORT}`);
});
