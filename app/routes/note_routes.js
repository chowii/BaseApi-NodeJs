var ObjectId = require('mongodb').ObjectId

module.exports = function(app, db) {

	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectId(id) };
		db.collection('notes_test').findOne(details, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(item);
			}
		})
	});

	app.get('/notes/', (req, res) => {
		db.collection('notes_test').find({}).toArray(function(err, result) {
			if (err) {
				res.send({ 'error' : 'An error has occured' });
			} else {
				res.send(result);
			}
		})
	});

	app.post('/notes', (req, res) => {
		const note = { text: req.body.body, title: req.body.title };
		db.collection('notes_test').insert(note, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				res.send(result.ops[0]);
			}
		});
	});
};