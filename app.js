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
    secret: "rainbows are pretty",
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: 'auto'
    }
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
    if (req.isAuthenticated()) {
        return next();
    }
    console.log("User is not authenticated.");
    res.status(401).redirect('/');
}

//Defining routes
app.use('/create-guide', authMiddleware, require('./routes/guide')(passport));

app.post('/login', function(req, res, next) {
    passport.authenticate('login', function(err, user) {
        if (err) {
            console.log("Login failed!");
            console.log(err);
            return next(err);
        } else if (!user) {
            console.log("User not defined!");
            console.log(user);
            return next();
        }

        req.logIn(user, function(err) {
            if (err) {
                console.log("Login failed!");
                console.log(err);
                next(err);
            }
            return res.redirect('/');
        })
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
    })(req, res, next);
});

app.use('/', require('./routes/index'));

app.listen(port, function() {
    console.log("Hello World listening on port " + port + "!");
});
