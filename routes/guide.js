var express = require('express');
var path = require('path');
var fs = require('fs');

var User = require('../models/user');

module.exports = function(passport) {

    var router = new express.Router();

    router.get('/', function(req, res) {
            res.render("guide-template", req.langObj);
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
