var path = require('path');
var fs = require('fs');
module.exports = function(req, res, next){
    var translationVars = [
        "fillOutYourGuide",
        "howIdidIt",
        "wasThisYourFirstJobInSweden",
        "yes",
        "no",
        "whatKindOfJobIsIt",
        "whatEducationDidYouHave",
        "path",
        "descriptionPreferablyShort",
        "submitButtonText"
    ] ;
    var lang = req.cookies.lang;
    var filepath = path.join(__dirname, '../lang/' + lang + '.json');
    fs.readFile(filepath, function(err , data){
        fs.readFile(path.join(__dirname, '../lang/en.json'), function(errEn, dataEn){
            var enLang = JSON.parse( dataEn );
            //begin
            var langObj;
            if(err){
                console.log("Language file for language " + lang + " not found! Falling back to english.");
                filepath = path.join(__dirname, '../lang/en.json');
                fs.readFile(filepath, function(err, data ){
                    langObj = JSON.parse(data);
                });
            }else{
                langObj = JSON.parse(data); 
            }
            var fullyTranslated = true;
            console.log("English fallback: " +  enLang ) ;
            for(var i = 0; i < translationVars.length; i++){
                if(!langObj[translationVars[i]]){
                    fullyTranslated = false;
                    console.log("enLang: " + enLang[translationVars[i]] + " translationVars[i] " + translationVars[i]);
                    langObj[translationVars[i]] = enLang[translationVars[i]];
                    console.log("Field " + translationVars[i] + " is not defined for language " + lang + " ! It was replaced by " + langObj[translationVars[i]]);
                }
            }
            //if(!fullyTranslated){
                //console.log("Language file for language " + lang + " is not fully translated! Falling back to English."); 
                //filepath = path.join(__dirname, '../lang/en.json');
                //fs.readFile(filepath, function(err, data ){
                    //langObj = JSON.parse(data);
                    //req.langObj = langObj;
                    //next();
                //});
            //}
            //else{
                req.langObj = langObj;
                next();
            //}
            //end
        });
    });
};
