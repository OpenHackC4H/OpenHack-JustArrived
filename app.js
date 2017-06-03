var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    express = require('express'),
    passport = require('passport'),
    dbConfig = require('./database'),
    mongoose = require('mongoose'),
    getLang = require('./util/getLang');

mongoose.connect(dbConfig.url);

//Start ExpressJS initialization.
const app = express();
var port = 7425;

app.set('views', './views');
app.set('view engine', 'ejs');

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

app.use(function(req, res, next) {
    if (typeof(req.cookies.lang) === 'undefined') {
        res.cookie('lang', 'en');
        req.cookies.lang = 'en';
    }

    next();
});
app.use(getLang);

require('./passport/init')(passport);

//Defining routes
app.use('/guide', require('./routes/guide')(passport));

app.listen(port, function() {
    console.log("Hello World listening on port " + port + "!");
})
