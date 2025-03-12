//Imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Setting Up Database
const MongoClient = require('mongodb').MongoClient; 
const url = process.env.MONGODB_URI;

if (!url) {
    console.error("❌ MongoDB URI is missing. Set it in the .env file.");
    process.exit(1); // Exit if the DB URL is not found
}

const client = new MongoClient(url);

client.connect()
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1); // Exit if the connection fails
    });

//Access Control Headers
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

//API calls
var api = require('./api.js');
api.setApp(app, client);


app.post('/api/login', async (req, res, next) =>
{
    try
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        var error = '';
        const { login, password } = req.body;
        const db = client.db('SalvageFinancialDB');
        const results = await
        db.collection('Users').find({Login:login,Password:password}).toArray();
        var id = -1;
        var fn = '';
        var ln = '';
        if( results.length > 0 )
        {
            id = results[0].UserId;
            fn = results[0].FirstName; 
            ln = results[0].LastName;
        }
        var ret = { id:id, firstName:fn, lastName:ln, error:''};
        res.status(200).json(ret);
    } 
    catch (error)
    {
        console.error("❌ Fetch Error:", error);
        res.status(500).json({ error: "Could not fetch users" });
    }
});

//Listening on port 5000
app.listen(5000);