var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    express = require('express'),
    passport = require('passport'),
    dbConfig = require('./database'),
    mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

//Start ExpressJS initialization.
const app = express();
var port = 8080;

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(require('cookie-parser')());
app.use(require('body-parser')());
app.use(require('express-session')({
    secret: "rainbows are pretty"
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));

app.listen(port, function() {
    console.log("Hello World listening on port " + port + "!");
})
