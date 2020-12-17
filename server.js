const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require("./config/db");
const app = express();
const appRoutes = require('./app/routes')

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

async function main() {
    const client = new MongoClient(db.url);
    await client.connect();

    launchServer(client);
}

main().catch(console.log);

function launchServer(database) {
    appRoutes(app, database);
    app.listen(port, () => {
        console.log("Live!")
    })
}
