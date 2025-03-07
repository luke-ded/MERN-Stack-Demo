exports.setApp = function ( app, client )
{
    const db = client.db('SalvageFinancialDB');
    const usersCollection = db.collection('Users');

    //Login API
    //In: Email, Password
    //Out: Result, _id
    app.post('/api/login', async (req, res) =>{
        let Result = "Could not find user";
        try {
            //Input
            const {Email, Password} = req.body;

            //DB Statement
            const user = await usersCollection.findOne(
                { Email: Email, Password: Password }, // Search criteria
                { projection: { _id: 1 } } // Return only the _id field
            );

            //If user is not null, send JSON response
            if (!user){
                res.status(200).json({Result: Result, _id: -1})
            }
            else{
                Result = "Found user";
                res.status(200).json({Result: Result, _id: user._id});
            }       
        } catch (error) {
            console.error("❌ Fetch Error:", error);
            res.status(500).json({Result: Result});
        }
    });
    
    //Signup API
    //In: FName, LName, Email, Password
    //Out: Result
    app.post('/api/signup', async (req, res) =>{
        let Result = "Could not add user";
        try {
            //Input
            const {FName, LName, Email, Password} = req.body;
            const newUser = {FName: FName, LName: LName, Email: Email, Password: Password}; //Making New User Object
            
            //DB Statement
            const user = await usersCollection.findOne(
                { Email: Email, Password: Password }, // Search criteria
            );
            if (!user){     //If user does not already exist
                await usersCollection.insertOne(newUser);
                Result = "Added user";
            }
            else{
                Result = "User Already Exists";
            }

            //Send JSON response
            res.status(200).json({Result: Result});
        } catch (error) {
            res.status(500).json({Result: Result});
        }
    });
    
    //DB Test API
    //Out: Whether DB connection was successful
    app.post('/api/dbtest', async (req, res) => {
        try {
            //DB Statement
            const collections = await db.listCollections().toArray();
            //Send JSON response
            res.status(200).json({ message: "✅ Connected to MongoDB!", collections: collections.map(c => c.name) });
        } catch (error) {
            res.status(500).json({ error: "❌ Database connection failed", details: error.message });
        }
    });

    //Test API
    app.post('/api/test', (req, res) => {
        res.send("✅ API is working!");
    });
}