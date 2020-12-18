var ObjectId = require('mongodb').ObjectId

module.exports = function(app, client) {

	app.get('/', (_, res) => {
		databasesList = getListDatabases(client, function(err, dbList) {
			if (err) return console.log("OMG Some error again: \n" + err);
		
			let databasesNameList = dbList.databases.map((item) => { return {'name' : item.name }});
			res.send(databasesNameList);
		})
	});

	async function getListDatabases(client, cb) { 
		return await client.db().admin().listDatabases(cb);
	};

	app.get('/notes/:name', (req, res) => {
		const id = req.params.name;
		client.db(id).listCollections().toArray((err, collections) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				let collectionNameList = collections.map((item) => { return { 'name' : item.name }});
				res.send(collectionNameList);
			}
		})
	});

	app.get('/notes/', (req, res) => {
		client.db().collection('users').find({}).toArray(function(err, result) {
			if (err) {
				res.send({ 'error' : 'An error has occured' });
			} else {
				console.log("RESPONSE RESULT>>")
				console.log(result);
				res.send(result);
			}
		})
	});

	app.post('/notes', (req, res) => {
		const note = { text: req.body.body, title: req.body.title };
		client.db.collection('notes_test').insert(note, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(result.ops[0]);
			}
		});
	});
};