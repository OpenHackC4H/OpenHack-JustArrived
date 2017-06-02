var express = require('express');

var router = new express.Router();

router.get('/:lang/', function(req, res) {
    var lang = req.lang;
    var json;
    res.render("index", json);
});

module.exports = router;
