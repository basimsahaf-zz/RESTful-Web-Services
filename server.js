//server.js

//Importing Express framework
const express = require('express');

//Importing our database Client to interact with our database
const MongoClient = require('mongodb').MongoClient;

//Importing bodyParser
const bodyParser = require('body-parser');

//connecting to our database

const db = require('./config/db');

const app = express(); //declaring an express instance.

//specifying port

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('We are now live on ' + port + '. ');
    });
})

