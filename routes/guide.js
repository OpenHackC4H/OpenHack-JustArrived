var express = require('express');

var User = require('../models/user');
var Guide = require('../models/guide');

var router = new express.Router();

router.get('/:id', function(req, res) {

    params = req.langObj;
    params.loggedIn = req.isAuthenticated();

    Guide.findById(req.params.id, function (err, guide) {
        if (err) {
            console.log("Error viewing guide.");
            console.log(err);
            return res.redirect('/');
        }

        params.title = guide.title;
        params.upvotes = guide.upvotes;
        params.isFirstJob = guide.firstJob;
        params.job = guide.job;
        params.education = guide.education;
        params.occupation = guide.prevOccupation;
        params.bullets = guide.bullets;
        params.description = guide.description;

        res.render('detailedGuide', params);
    });
});

module.exports = router;
