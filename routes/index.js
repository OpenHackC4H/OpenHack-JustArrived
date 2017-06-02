var express = require('express');

module.exports = function(passport) {

    var router = new express.Router();

    router.get('/', function(req, res) {

        res.render("index");
    });

    router.post('/login', passport.authenticate('login'));

    return router;
};
