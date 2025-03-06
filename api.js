require('express');
require('mongodb');
/*const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 5000;

const MongoClient = require('mongodb').MongoClient; 
const url = 'mongodb+srv://kentaf1202:Lihys2G76A1hS6Ld@salvagefinancialdb.pvcx6.mongodb.net/SalvageFinancialDB?retryWrites=true&w=majority';

const client = new MongoClient(url);
client.connect();*/

exports.setApp = function ( app, client )
{
    app.get('/api/login', async (req, res) => {
        try {
            const {email, password } = req.body;

            const db = client.db('SalvageFinancialDB');
            const usersCollection = db.collection('Users');
            
            const users = await usersCollection.findOne(
                { email: email, password: password }, // Search criteria
                { projection: { _id: 1 } } // Return only the _id field
            );
            res.status(200).json(users, {error: error});
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            res.status(500).json({ error: "Could not sign in" });
        }
    });

    app.get('/api/signup', async (req, res) => {
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

    /*app.get('/api/users', async (req, res) => {
        try {
            const db = client.db('SalvageFinancialDB');
            const usersCollection = db.collection('Users');
            
            const users = await usersCollection.find().toArray();
            res.status(200).json(users);
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            res.status(500).json({ error: "Could not fetch users" });
        }
    });*/
}
/*
app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});*/