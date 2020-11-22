const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');

const port = 8000;
app.use(bodyParser.json({ extended: true }));
MongoClient.connect(db.url, (err, database) => {
    const myDb = database.db('local')
    if (err) {
        return console.log(err)
    }
    require('./app/routes')(app, myDb);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});