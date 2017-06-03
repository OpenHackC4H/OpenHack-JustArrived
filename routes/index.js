var express = require('express');
var path = require('path');
var fs = require('fs');

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
                res.render("guide-template", json);
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

module.exports = router;
