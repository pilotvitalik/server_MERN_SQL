require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const db = mysql.createConnection({
	user: 'root',
	host: 'localhost',
	password: process.env.PASSWD,
	database: process.env.DB	
});

app.use(cors());
app.use(express.json());

app.post('/create', (req, res) => {
	console.log(req.body)
	const name = req.body.name;
	const age = req.body.age;
	const country = req.body.country;
	const position = req.body.position;
	const wage = req.body.wage;

	db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?, ?, ?, ?, ?)',
		[ name, age, country, position, wage ],
		(err, result) => {
			if (err){
				console.log(err);
			} else {
				console.log('values inserted');
			}
	} );
});

app.get('/employees', (req, res) => {
	db.query('SELECT * FROM employees', (err, result) => {
		if (err){
			console.log(err);
		} else {
			res.send(result);
		}
	})
});

app.listen(3001, () => {
	console.log('Server start on port 3001');
});