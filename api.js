//require('express');
//require('mongodb');

exports.setApp = function ( app, client )
{
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
    
    app.post('/api/signup', async (req, res) =>{
        try {
            const {FName, LName, Email, Password} = req.body;
            const newUser = {FName: FName, LName: LName, Email: Email, Password: Password};
    
            const db = client.db('SalvageFinancialDB');
            const usersCollection = db.collection('Users');
            
            const users = await usersCollection.insertOne(newUser);
            res.status(200).json({result: "Added User"});
        } catch (error) {
            res.status(500).json({result: "Could not add user" });
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
}