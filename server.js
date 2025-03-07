const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb+srv://kentaf1202:Lihys2G76A1hS6Ld@salvagefinancialdb.pvcx6.mongodb.net/SalvageFinancialDB?';

const client = new MongoClient(url);
client.connect()


app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
	'Access-Control-Allow-Headers',
	'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
	'Access-Control-Allow-Methods',
	'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});


app.post('/api/addcard', async (req, res, next) =>
{
// incoming: userId, color
// outgoing: error
const { userId, card } = req.body;
const newCard = {Card:card,UserId:userId};
var error = '';
try
{
const db = client.db();
const result = db.collection('Cards').insertOne(newCard);
}
catch(e)
{
error = e.toString();
}
cardList.push( card );
var ret = { error: error };
res.status(200).json(ret);
});

app.post('/api/login', async (req, res) =>{
	try {
		const {Email, Password} = req.body;

		const db = client.db('SalvageFinancialDB');
		const usersCollection = db.collection('Users');
		
		const users = await usersCollection.findOne(
			{ Email: Email, Password: Password }, // Search criteria
			{ projection: { _id: 1 } } // Return only the _id field
		);
		const error = "Could not find user";
		res.status(200).json({userId: users._id});
	} catch (error) {
		console.error("❌ Fetch Error:", error);
		res.status(500).json({ error: "Could not sign in" });
	}
});


app.post('/api/dbtest', async (req, res) => {
    try {
        const db = client.db('SalvageFinancialDB');
        const collections = await db.listCollections().toArray();
        res.status(200).json({ message: "✅ Connected to MongoDB!", collections: collections.map(c => c.name) });
    } catch (error) {
        res.status(500).json({ error: "❌ Database connection failed", details: error.message });
    }
});


app.post('/api/test', (req, res) => {
    res.send("✅ API is working!");
});

app.listen(5000, () => {
    console.log(`🚀 Server running on http://localhost:5000`);
});