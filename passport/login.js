var bCrypt = require('bcrypt-nodejs');

var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');

module.exports = function(passport) {
    //Define passport strategies
    passport.use('login', new LocalStrategy({
        passReqToCallback: true
    }, function(req, username, password, done) {

        User.findOne({
                'username': username
            },
            function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    console.log('User Not Found with username ' + username);

                    return done(null, false);
                }

                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return done(null, false);
                }

                console.log("Sucessfully logged in " + username);
                return done(null, user);
            });
    }));


    var isValidPassword = function(user, password) {
        return bCrypt.compareSync(password, user.password);
    };
}
