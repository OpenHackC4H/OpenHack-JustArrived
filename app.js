var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    express = require('express');

//MongoDB URL (config option?)
var url = 'mongodb://localhost:27017/openhack';

var database = require('./database')(url);

if (database !== null) {
    console.log("Successfully connected to database!");
}

//Start ExpressJS initialization.
const app = express();
var port = 8080;

app.get('/', function(req, res) {
    res.send('Hello World!');
});


app.listen(port, function() {
    console.log("Hello World listening on port " + port + "!");
})
