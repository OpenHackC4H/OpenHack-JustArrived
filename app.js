var MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    express = require('express'),
    passport = require('passport'),
    dbConfig = require('./database'),
    mongoose = require('mongoose');

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

require('./passport/init')(passport);

function authMiddleware(req, res, next) {
    if (req.isAuthenticated()) {return next(); }
    res.status(401).redirect('/');
}

//Defining routes
app.use('/', require('./routes/index'));
app.use('/create-guide', authMiddleware, require('./routes/guide')(passport));

app.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, account) {
        if (err) {
            console.log("Login failed!");
            console.log(err);
        } else {
            console.log("Account " + account + " logged in.");
        }
        res.redirect('/');
    })(req, res, next);
});

app.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, account) {
        if (err) {
            console.log('Signup failed!');
            console.log(err);
        } else {
            console.log("Account" + account + " signed up.");
        }
        res.redirect('/');
    })
})

app.listen(port, function() {
    console.log("Hello World listening on port " + port + "!");
})
