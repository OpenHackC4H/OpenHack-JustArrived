var express = require('express');

var User = require('../models/user');

module.exports = function(passport) {

    var router = new express.Router();

    router.get('/', function(req, res) {

        res.render("index");
    });

    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(err, account) {
            console.log(err);
            console.log(account);
            res.redirect('/');
        })(req, res, next);
    });
router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/'
}));

return router;
};
