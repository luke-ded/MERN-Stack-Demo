exports.setApp = function ( app, client )
{
    const db = client.db('SalvageFinancialDB');
    const usersCollection = db.collection('Users');

    //Login API
    //In: Email, Password
    //Out: Result, _id
    app.post('/api/login', async (req, res) =>{
        let Result = "Could not find login";
        try {
            //Input
            const {Email, Password} = req.body;

            //DB Statement
            const user = await usersCollection.findOne(
                { Email: Email, Password: Password },   //Search criteria
                { projection: { _id: 1 } }      //Returns only _id
            );

            //Configure response and send JSON response
            if (!user){     //If user does not match
                Result = "Could not match user";
                res.status(200).json({Result: Result, _id: -1});
            }
            else{   //If user does match
                Result = "Found user";
                res.status(200).json({Result: Result, _id: user._id});
            }       
        } catch (error) {
            console.error("❌ Error:", error);
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
                { Email: Email, Password: Password },   //Search criteria
            );

            //Configure response
            if (!user){         //If user doesnt already exist
                await usersCollection.insertOne(newUser);   //Adds new Users
                Result = "Added user";
            }
            else{           //If user already exists
                Result = "User Already Exists";
            }

            //Send JSON response
            res.status(200).json({Result: Result});
        } catch (error) {
            console.error("❌ Error:", error);
            res.status(500).json({Result: Result});
        }
    });

    //AddInitial API
    //In: _id, InitialDebt, InitialAmount
    //Out: Result
    app.post('/api/AddInitial', async (req,res) => {
        let Result = "Could not add amount";
        try{
            //Input
            const {_id, InitialDebt, InitialAmount} = req.body();

            //DB 
            const user = await usersCollection.updateOne(
                { _id: _id},    //Search criteria
                {InitialDebt: InitialDebt, InitialAmount: InitialAmount}   //Updated info
            );

            //Configure response
            if (user.matchedCount === 0) {          //If no user was updated
                Result = "Could not find user to add initial debt and amount to";
            }
            else{          //If user was updated 
                Result = "Added amounts to user";
            }

            //Send JSON response
            res.status(200).json({Result: Result});
        } catch (error) {
            console.error("❌ Error:", error);
            res.status(500).json({Result: Result});
        }
    });

    //AddIncome API
    //In: _id, Name, Amount, IfReccuring, InitialTime, TimeFrame
    //Out: Result
    app.post('/api/AddIncome', async (req,res) => {
        let Result = "Could not add income";
        try{
            //Input
            const {_id, Name, Amount, IfReccuring, InitialTime, TimeFrame} = req.body();
            const newIncome = {Name, Amount, IfReccuring, InitialTime, TimeFrame};

            //DB 
            const user = await usersCollection.updateOne(
                { _id: _id},    //Search criteria
                {$push : {Income: newIncome}}   //Pushing onto Income Array new Income
            );

            //Configure response and send JSON response
            if (user.matchedCount === 0) {          //If no user was updated
                Result = "Could not find user to add income";
            }
            else{          //If user was updated 
                Result = "Added income to user";
            }

            //Send JSON response
            res.status(200).json({Result: Result});
        } catch (error) {
            console.error("❌ Error:", error);
            res.status(500).json({Result: Result});
        }
    });

    //AddExpenses API
    //In: _id, Name, Category, Amount, IfReccuring, InitialTime, TimeFrame
    //Out: Result
    app.post('/api/AddExpenses', async (req,res) => {
        let Result = "Could not add expense";
        try{
            //Input
            const {_id, Name, Amount, Category, IfReccuring, InitialTime, TimeFrame} = req.body();
            const newExpense = {Name, Amount, Category, IfReccuring, InitialTime, TimeFrame};

            //DB 
            const user = await usersCollection.updateOne(
                { _id: _id},    //Search criteria
                {$push : {Expenses: newExpense}}   //Pushing onto Expenses Array new Expense
            );

            //Configure response
            if (user.matchedCount === 0) {          //If no user was updated
                Result = "Could not find user to add expense";
            }
            else{          //If user was updated 
                Result = "Added expense to user";
            }

            //Send JSON response
            res.status(200).json({Result: Result});
        } catch (error) {
            console.error("❌ Error:", error);
            res.status(500).json({Result: Result});
        }
    });
    
    //ShowAllInfo API
    //In: _id
    //Out: Result, FName, LName, Email, Password, InitialAmount, InitialDebt, Income[], Expenses
    app.post('/api/ShowAllInfo', async (req,res) => {
        let Result = "Could not show all information";
        try{
            //Input
            const {_id} = req.body();

            //DB 
            const user = await usersCollection.findOne(
                { _id: _id}   //Search criteria
            );

            //Configure response and send JSON response
            if (user.matchedCount === 0) {          //If no user was found
                Result = "Could not find user to show";
            }
            else{          //If user was found
                Result = "Found user";
                res.status(200).json({Result: Result, User: user});
            }
        } catch (error) {
            console.error("❌ Error:", error);
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