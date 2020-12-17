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

	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectId(id) };
		client.db().collection('users').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
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