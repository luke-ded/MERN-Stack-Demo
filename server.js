const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config()
//const url = process.env.MONODB_URI;
const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb+srv://kentaf1202:Lihys2G76A1hS6Ld@salvagefinancialdb.pvcx6.mongodb.net/SalvageFinancialDB?retryWrites=true&w=majority';
const client = new MongoClient(url);
await client.connect();

//var api = require('./api.js');
//api.setApp(app, client);

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers',
				  'Origin, X-requested-With, Content-Type, Accept, Authorization');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS');
	next();
});

app.post('/api/login', async (req, res) => {
	try {
		const {email, password } = req.body;

		const db = client.db('SalvageFinancialDB');
		const usersCollection = db.collection('Users');
		
		const users = await usersCollection.findOne(
			{ email: email, password: password }, // Search criteria
			{ projection: { _id: 1 } } // Return only the _id field
		);
		const error = "Could not find user";
		res.status(200).json(users || {error: error});
	} catch (error) {
		console.error("❌ Fetch Error:", error);
		res.status(500).json({ error: "Could not sign in" });
	}
});

app.post('/api/signup', async (req, res) => {
	try {
		const { fname, lname, email, password } = req.body;
		const newUser = {fname: fname, lname: lname, email: email, password: password};
		var error = 'Finished succesfully';

		const db = client.db('SalvageFinancialDB');
		const usersCollection = db.collection('Users');
		
		const users = await usersCollection.insertOne(newUser);
		res.status(200).json({error: error});
	} catch (error) {
		console.error("❌ Fetch Error:", error);
		res.status(500).json({ error: "Could not sign up" });
	}
});

app.get('/test', (req, res) => {
    res.send("✅ API is working!");
});

app.listen(5000);