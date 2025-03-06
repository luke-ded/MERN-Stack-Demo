require('express');
require('mongodb');

exports.setApp = function ( app, client )
{
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
}
/*
app.listen(5000, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});*/