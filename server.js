const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require("./config/db");
const app = express();
const appRoutes = require('./app/routes')

const port = 8008;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

async function main() {
    mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true});
    const client = mongoose.connection
    
    client.on('open', function(err, d) {

        console.log(typeof d)
        launchServer(client);
    })
}

main().catch(console.log);

function launchServer(database) {
    app.listen(port, () => {
        console.log("Live!")
    })
    appRoutes(app, database);
}
