var express = require('express');

var Guide = require('../models/guide');

var router = new express.Router();

router.get('/', function(req, res) {

    var params = req.langObj;
    params.loggedIn = req.isAuthenticated();

    Guide.find({language: req.cookies.lang}, function(err, guides) {

        params.guides = guides;

        res.render('mainpage', params);
    });
});

module.exports = router;
