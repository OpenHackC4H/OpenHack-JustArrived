var express = require('express');
var path = require('path');
var fs = require('fs');

var User = require('../models/user');

module.exports = function(passport) {

    var router = new express.Router();

    router.get('/:lang/guide', function(req, res) {
        var lang = req.params.lang;
        var json;
        var filepath = path.join(__dirname, '../lang/' + lang + '.json');
        fs.readFile(filepath, function(err , data){
            if(err){
                filepath = path.join(__dirname, '../lang/en.json');
                fs.readFile(filepath, function(err, data ){
                    console.log("goddag " + err);
                    console.log("goddag " + data);
                    json = JSON.parse(data);
                    res.render("mainpage", json);
                });
            }
            else{
                console.log("Hej " + err);
                console.log("Hej " + data);
                json = JSON.parse(data);
                res.render("guide-template", json);
            }
        });
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
