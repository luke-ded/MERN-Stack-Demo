require('express');
require('mongodb');


app.post('/api/login', async (req, res, next) => {
	// incoming: login, password
	// outgoing: id, firstName, lastName, error
	
	var error = '';
	
	const { login, password } = req.body;

	const db = client.db();
	const results = await db.collection('Users').find({Login:login,Password:password}).toArray();

	var id = -1;
	var firstName = '';
	var lastName ='';

	if( results.length > 0){
		id = results[0].UserId;
		firstName = results[0].FirstName;
		lastName = results[0].LastName;
	}

	var ret = { id:id, firstName: fName, lastName:lName, error: '' };
	res.status(200).json(ret):
});
