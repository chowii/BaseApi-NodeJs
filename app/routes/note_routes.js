var ObjectId = require('mongodb').ObjectId
const movieModel = require('/Users/nscy6/IntellijProjects/BaseApi-NodeJs/atlas/MoviesModel.js')

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

	app.get('/:name', (req, res) => {
		const name = req.params.name;
		client.db(name).listCollections().toArray((err, collections) => {
			if (err) {
				res.send({ 'error': 'An error has occured' });
			} else {
				let collectionNameList = collections.map((item) => { return { 'name' : item.name }});
				res.send(collectionNameList);
			}
		})
	});

	app.get('/:name/:table', (req, res) => {
		const headers = req.headers
		const limit = parseInt(headers.pagesize)
		const page = parseInt(headers.page)
		const params = req.params
		const name = params.name;
		const table = params.table;
		client.db(name).collection(table).find(null, {
			limit: limit, 
			skip: (page * (limit - 1)),
			projection: { title: 5, year: 1 } 
		}).toArray(function(err, result) {
			if (err) {
				res.send({ 'error' : 'An error has occured' + err });
			} else {
				res.send({
					'page': page,
					'count': limit,
					'data':result
				});
			}
		})
	});

	app.get('/:name/:table/:id', (req, res) => {
		const headers = req.headers
		const limit = parseInt(headers.pagesize)
		const page = parseInt(headers.page)
		const params = req.params
		const name = params.name;
		const table = params.table;
		const id = params.id;
		const query = req.query
		console.log(query)
		movieModel.find(query, function(error, movie) {
			if (error) {
				res.send({ 'error': 'An error has occured' });
			} else {
				console.log(movie)
				res.status(200).send(movie);
			}
		})
		console.log(id)
		});
};