var express = require('express');
var path = require('path');
var fs = require('fs');
var validator = require('validator');

var User = require('../models/user');
var Guide = require('../models/guide');

module.exports = function(passport) {

    var router = new express.Router();

    router.get('/', function(req, res) {
            res.render("guide-template", req.langObj);
    });

    router.post('/upload', function(req, res) {

        if ((validator.equals(req.body.firstJob, 'no') || validator.equals(req.body.firstJob, 'yes'))
            && validator.isInt(req.body.numberBullets) && parseInt(req.body.numberBullets) > 0
            && !validator.isEmpty(validator.trim(req.body.jobType))
            && !validator.isEmpty(validator.trim(req.body.previousEducation))) {

            var numBullets = parseInt(req.body.numberBullets);
            
            var guide = new Guide();

            guide.firstJob = (req.body.firstJob === 'yes' ? true:false);
            guide.job = validator.trim(req.body.jobType);
            guide.education = validator.trim(req.body.previousEducation);

            var bullets = [];
            for (var i = 0; i < numBullets; i++) {
                var title = req.body['bulletTitle' + i];
                var desc = req.body['bulletDescr' + i];

                if (validator.isEmpty(validator.trim(title)) || validator.isEmpty(validator.trim(desc))) {
                    break;
                }
                bullets.push({ title: title, description: desc, order: i });
            }

            guide.bullets = bullets;
            guide.language = req.cookies.lang;
            guide.author = req.user._id;

            guide.save(function(err) {
                if (err) {
                    console.log("Could not save guide!");
                    console.log(err);
                    res.status(500).end();
                }
                else {
                    console.log("Added guide!");
                    res.status(200).end();
                }
            });
        }
        else {
            console.log("Malformatted guide POST.");
            console.log(req.body);
            res.status(400).end();
        }
    });

    return router;
};
