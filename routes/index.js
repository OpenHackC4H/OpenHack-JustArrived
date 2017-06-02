var express = require('express');
var fs = require('fs');

var router = new express.Router();

router.get('/:lang/', function(req, res) {
    var lang = req.lang;
    var json;
    fs.readFile(lang, function(err , data)){
        if(err){
            fs.readFile("en", function(err, data ){
                json = JSON.parse(data);
            });
        }
        else{
            json = JSON.parse(data);
        }
    };
    res.render("index", json);
});

module.exports = router;
